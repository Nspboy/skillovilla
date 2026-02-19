const router        = require("express").Router();
const Mentor        = require("../models/Mentor");
const { MentorSession } = require("../models/Session");
const { protect, restrictTo } = require("../middleware/auth");

// ── GET /api/mentors  (public) ────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { expertise, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };
    if (expertise) query.expertise = { $in: [expertise] };

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Mentor.countDocuments(query);

    const mentors = await Mentor.find(query)
      .populate("user", "name email avatar")
      .sort({ rating: -1, totalSessions: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({ status: "success", total, data: { mentors } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── GET /api/mentors/:id  (public) ────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate("user", "name email avatar bio");
    if (!mentor) return res.status(404).json({ status: "fail", message: "Mentor not found" });
    res.status(200).json({ status: "success", data: { mentor } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── POST /api/mentors  (admin only) ───────────────────────────────────────
router.post("/", protect, restrictTo("admin"), async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json({ status: "success", data: { mentor } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── PATCH /api/mentors/:id  (admin or the mentor themselves) ──────────────
router.patch("/:id", protect, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ status: "fail", message: "Mentor not found" });

    const isOwner = mentor.user.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin")
      return res.status(403).json({ status: "fail", message: "Not authorized" });

    const updated = await Mentor.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    res.status(200).json({ status: "success", data: { mentor: updated } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── POST /api/mentors/:id/book  (student, protected) ─────────────────────
router.post("/:id/book", protect, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ status: "fail", message: "Mentor not found" });

    const session = await MentorSession.create({
      mentor:      mentor._id,
      student:     req.user._id,
      scheduledAt: req.body.scheduledAt,
      duration:    req.body.duration    || 60,
      topic:       req.body.topic       || "",
      amountPaid:  req.body.amountPaid  || mentor.hourlyRate,
      paymentId:   req.body.paymentId   || "",
    });

    res.status(201).json({ status: "success", data: { session } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── GET /api/mentors/:id/sessions  (mentor or admin) ─────────────────────
router.get("/:id/sessions", protect, async (req, res) => {
  try {
    const sessions = await MentorSession.find({ mentor: req.params.id })
      .populate("student", "name email avatar")
      .sort({ scheduledAt: -1 });
    res.status(200).json({ status: "success", total: sessions.length, data: { sessions } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── PATCH /api/mentors/sessions/:sessionId/feedback  (student only) ───────
router.patch("/sessions/:sessionId/feedback", protect, async (req, res) => {
  try {
    const session = await MentorSession.findById(req.params.sessionId);
    if (!session) return res.status(404).json({ status: "fail", message: "Session not found" });
    if (session.student.toString() !== req.user._id.toString())
      return res.status(403).json({ status: "fail", message: "Not your session" });

    session.studentRating   = req.body.rating;
    session.studentFeedback = req.body.feedback;
    session.status          = "completed";
    await session.save();

    // Update mentor's aggregate rating
    const allSessions = await MentorSession.find({ mentor: session.mentor, studentRating: { $exists: true } });
    const avg = allSessions.reduce((s, ss) => s + ss.studentRating, 0) / allSessions.length;
    await Mentor.findByIdAndUpdate(session.mentor, {
      rating: Math.round(avg * 10) / 10,
      ratingCount: allSessions.length,
      $inc: { totalSessions: 0 }, // already counted at booking
    });

    res.status(200).json({ status: "success", data: { session } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

module.exports = router;

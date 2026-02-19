const router     = require("express").Router();
const { LiveClass } = require("../models/Session");
const Enrollment = require("../models/Enrollment");
const { Certificate } = require("../models/Blog");
const { protect, restrictTo } = require("../middleware/auth");

// ════════════════════════════════════════
//  LIVE CLASSES
// ════════════════════════════════════════

// GET /api/sessions/live  (public)
router.get("/live", async (req, res) => {
  try {
    const { course, status } = req.query;
    const query = {};
    if (course) query.course = course;
    if (status) query.status = status;

    const sessions = await LiveClass.find(query)
      .populate("mentor", "initials color role")
      .populate("course", "title color")
      .sort({ scheduledAt: 1 });

    res.status(200).json({ status: "success", total: sessions.length, data: { sessions } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// GET /api/sessions/live/:id
router.get("/live/:id", async (req, res) => {
  try {
    const session = await LiveClass.findById(req.params.id)
      .populate("mentor")
      .populate("course")
      .populate("attendees", "name avatar");
    if (!session) return res.status(404).json({ status: "fail", message: "Session not found" });
    res.status(200).json({ status: "success", data: { session } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// POST /api/sessions/live  (admin or mentor)
router.post("/live", protect, restrictTo("admin", "mentor"), async (req, res) => {
  try {
    const session = await LiveClass.create(req.body);
    res.status(201).json({ status: "success", data: { session } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// PATCH /api/sessions/live/:id  (admin or mentor)
router.patch("/live/:id", protect, restrictTo("admin", "mentor"), async (req, res) => {
  try {
    const session = await LiveClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: "success", data: { session } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// POST /api/sessions/live/:id/attend  (student — mark attendance)
router.post("/live/:id/attend", protect, async (req, res) => {
  try {
    const session = await LiveClass.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { attendees: req.user._id }, $inc: { attendeeCount: 0 } },
      { new: true }
    );
    // Recalculate count
    session.attendeeCount = session.attendees.length;
    await session.save();
    res.status(200).json({ status: "success", data: { attendeeCount: session.attendeeCount } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ════════════════════════════════════════
//  STUDENT DASHBOARD
// ════════════════════════════════════════

// GET /api/sessions/dashboard  (student — personalised summary)
router.get("/dashboard", protect, async (req, res) => {
  try {
    const studentId = req.user._id;

    // Enrolled courses with progress
    const enrollments = await Enrollment.find({ student: studentId })
      .populate("course", "title color icon duration level")
      .sort({ enrolledAt: -1 });

    // Upcoming live sessions for the enrolled courses
    const courseIds = enrollments.map(e => e.course._id);
    const upcomingSessions = await LiveClass.find({
      course:      { $in: courseIds },
      scheduledAt: { $gte: new Date() },
      status:      { $in: ["scheduled", "live"] },
    })
      .populate("course",  "title color")
      .populate("mentor",  "initials color role")
      .sort({ scheduledAt: 1 })
      .limit(5);

    // Certificates
    const certificates = await Certificate.find({ student: studentId })
      .populate("course", "title color icon");

    // Aggregate stats
    const hoursLearned    = req.user.hoursLearned    || 0;
    const sessionsAttended= req.user.sessionsAttended || 0;

    res.status(200).json({
      status: "success",
      data: {
        enrollments,
        upcomingSessions,
        certificates,
        stats: {
          enrolledCount:    enrollments.length,
          completedCount:   enrollments.filter(e => e.status === "completed").length,
          hoursLearned,
          sessionsAttended,
          certificateCount: certificates.length,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;

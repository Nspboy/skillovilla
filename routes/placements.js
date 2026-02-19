const router = require("express").Router();
const { Company, Job, Placement, Application } = require("../models/Placement");
const { protect, restrictTo } = require("../middleware/auth");

// ════════════════════════════════════════
//  COMPANIES
// ════════════════════════════════════════

// GET /api/placements/companies
router.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({ status: "success", total: companies.length, data: { companies } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// POST /api/placements/companies  (admin)
router.post("/companies", protect, restrictTo("admin"), async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({ status: "success", data: { company } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ════════════════════════════════════════
//  JOBS
// ════════════════════════════════════════

// GET /api/placements/jobs
router.get("/jobs", async (req, res) => {
  try {
    const { company, type } = req.query;
    const query = { isOpen: true };
    if (company) query.company = company;
    if (type)    query.type    = type;

    const jobs = await Job.find(query)
      .populate("company", "name logo color")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: "success", total: jobs.length, data: { jobs } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// POST /api/placements/jobs  (admin)
router.post("/jobs", protect, restrictTo("admin"), async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ status: "success", data: { job } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// PATCH /api/placements/jobs/:id  (admin)
router.patch("/jobs/:id", protect, restrictTo("admin"), async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: "success", data: { job } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ════════════════════════════════════════
//  APPLICATIONS
// ════════════════════════════════════════

// POST /api/placements/jobs/:id/apply  (student)
router.post("/jobs/:id/apply", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || !job.isOpen)
      return res.status(400).json({ status: "fail", message: "Job not available" });

    const application = await Application.create({
      student:     req.user._id,
      job:         job._id,
      resumeUrl:   req.body.resumeUrl   || "",
      coverLetter: req.body.coverLetter || "",
    });

    res.status(201).json({ status: "success", data: { application } });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ status: "fail", message: "Already applied to this job" });
    res.status(400).json({ status: "error", message: err.message });
  }
});

// GET /api/placements/my-applications  (student — own applications)
router.get("/my-applications", protect, async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate({ path: "job", populate: { path: "company", select: "name logo color" } })
      .sort({ appliedAt: -1 });
    res.status(200).json({ status: "success", total: applications.length, data: { applications } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// PATCH /api/placements/applications/:id/status  (admin)
router.patch("/applications/:id/status", protect, restrictTo("admin"), async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: new Date() },
      { new: true }
    );
    res.status(200).json({ status: "success", data: { application } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ════════════════════════════════════════
//  PLACEMENT HALL OF FAME
// ════════════════════════════════════════

// GET /api/placements  (public — success stories)
router.get("/", async (req, res) => {
  try {
    const { course, company } = req.query;
    const query = { isPublic: true };
    if (course)  query.course  = course;
    if (company) query.company = company;

    const placements = await Placement.find(query)
      .populate("student", "name avatar")
      .populate("company", "name logo color")
      .populate("course",  "title color icon")
      .sort({ placedAt: -1 });

    res.status(200).json({ status: "success", total: placements.length, data: { placements } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// POST /api/placements  (admin — record a new placement)
router.post("/", protect, restrictTo("admin"), async (req, res) => {
  try {
    const placement = await Placement.create(req.body);
    res.status(201).json({ status: "success", data: { placement } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

module.exports = router;

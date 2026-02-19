const router = require("express").Router();
const { Blog } = require("../models/Blog");
const { protect, restrictTo } = require("../middleware/auth");

// ── GET /api/blogs  (public — list with filters) ─────────────────────────
router.get("/", async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const query = { isPublished: true };

    if (category && category !== "All") query.category = category;
    if (search) query.$text = { $search: search };

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Blog.countDocuments(query);

    const blogs = await Blog.find(query)
      .populate("author", "name avatar role")
      .select("-content")           // omit full content in list view
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({ status: "success", total, pages: Math.ceil(total / limit), data: { blogs } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── GET /api/blogs/:slug  (public — full post) ────────────────────────────
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true })
      .populate("author", "name avatar role bio")
      .populate("comments.user", "name avatar");

    if (!blog) return res.status(404).json({ status: "fail", message: "Post not found" });

    // Increment view count
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    res.status(200).json({ status: "success", data: { blog } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── POST /api/blogs  (admin / mentor) ─────────────────────────────────────
router.post("/", protect, restrictTo("admin", "mentor"), async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      author: req.user._id,
      publishedAt: req.body.isPublished ? new Date() : undefined,
    });
    res.status(201).json({ status: "success", data: { blog } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── PATCH /api/blogs/:id  (author or admin) ───────────────────────────────
router.patch("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ status: "fail", message: "Post not found" });

    const isAuthor = blog.author.toString() === req.user._id.toString();
    if (!isAuthor && req.user.role !== "admin")
      return res.status(403).json({ status: "fail", message: "Not authorized" });

    if (req.body.isPublished && !blog.publishedAt) req.body.publishedAt = new Date();
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: "success", data: { blog: updated } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── DELETE /api/blogs/:id  (admin or author) ──────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ status: "fail", message: "Post not found" });

    const isAuthor = blog.author.toString() === req.user._id.toString();
    if (!isAuthor && req.user.role !== "admin")
      return res.status(403).json({ status: "fail", message: "Not authorized" });

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── POST /api/blogs/:id/like  (protected) ─────────────────────────────────
router.post("/:id/like", protect, async (req, res) => {
  try {
    const blog    = await Blog.findById(req.params.id);
    const userId  = req.user._id.toString();
    const already = blog.likes.map(String).includes(userId);

    const update = already
      ? { $pull: { likes: req.user._id } }
      : { $addToSet: { likes: req.user._id } };

    const updated = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
    res.status(200).json({ status: "success", liked: !already, totalLikes: updated.likes.length });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── POST /api/blogs/:id/comment  (protected) ──────────────────────────────
router.post("/:id/comment", protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { user: req.user._id, text: req.body.text } } },
      { new: true }
    ).populate("comments.user", "name avatar");

    res.status(201).json({ status: "success", data: { comments: blog.comments } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── DELETE /api/blogs/:id/comment/:commentId  (author or admin) ───────────
router.delete("/:id/comment/:commentId", protect, async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, {
      $pull: { comments: { _id: req.params.commentId } },
    });
    res.status(200).json({ status: "success", message: "Comment removed" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

module.exports = router;

const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { protect } = require("../middleware/auth");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer (Memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ── POST /api/upload ──────────────────────────────────────────────────────
router.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "fail", message: "No file uploaded" });
    }

    // Upload to Cloudinary stream
    const uploadStream = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "talentstack", resource_type: "auto" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        stream.end(buffer);
      });
    };

    const result = await uploadStream(req.file.buffer);

    res.status(200).json({
      status: "success",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
      },
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ status: "error", message: "Image upload failed" });
  }
});

module.exports = router;

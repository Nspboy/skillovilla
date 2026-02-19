const router = require("express").Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

// ── POST /api/auth/register ───────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          status: "fail",
          message: "Please provide name, email and password",
        });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "student", // Default to student
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email already exists" });
    }
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ status: "fail", message: "Incorrect email or password" });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────
router.get("/me", protect, async (req, res) => {
  res.status(200).json({
    status: "success",
    data: { user: req.user },
  });
});

// ── POST /api/auth/forgot-password ────────────────────────────────────────
router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({
          status: "fail",
          message: "There is no user with that email address.",
        });
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash it and save to database
    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    // In a real app, send email here. For now, return token in response for dev.
    const resetURL = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

    res.status(200).json({
      status: "success",
      message: "Token sent to email! (Check response for dev)",
      resetToken,
      resetURL,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── PATCH /api/auth/reset-password/:token ─────────────────────────────────
router.patch("/reset-password/:token", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "Token is invalid or has expired" });
    }

    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── PATCH /api/auth/change-password ───────────────────────────────────────
router.patch("/change-password", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!(await user.comparePassword(req.body.currentPassword))) {
      return res
        .status(401)
        .json({ status: "fail", message: "Your current password is wrong" });
    }

    user.password = req.body.password;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

module.exports = router;

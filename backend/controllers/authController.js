const ErrorResponse = require("../errorUtil/errorUtility.js");
const asyncHandler = require("../middleware/async.js");
const Media = require("../models/MediaSchema.js");
const User = require("../models/UserSchema.js");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Create user
  let user = new User({
    name,
    email,
    password,
  });

  user = await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.deleteaccount = asyncHandler(async (req, res) => {
  const useraccount = await User.findById(req.user._id);

  if (!useraccount) {
    next(new ErrorResponse("This user does not exist", 404));
  }

  const media = await Media.deleteMany({ userId: req.user._id });

  await useraccount.findByIdAndDelete(req.user._id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

const asyncHandler = require("../middleware/async.js");
const User = require("../models/UserSchema.js");

// @desc      Get single user
// @route     GET /api/v1/auth/user/:userId
// @access    Private
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private
exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  user.role = "user";
  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private
exports.updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  console.log("This route is hit.........updated bytton");
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private
exports.deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({
    success: true,
    data: {},
  });
});

const express = require("express");

userRouter = express.Router();

const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController.js");
const { protect, authorize } = require("../middleware/auth.js");

userRouter.use(protect);
userRouter.use(authorize("admin"));

userRouter.route("/").post(createUser).get(getUser);

userRouter.route("/:userId").put(updateUser).delete(deleteUser);

module.exports = userRouter;

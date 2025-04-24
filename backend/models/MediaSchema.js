const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mediaId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  filetype: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Media = mongoose.model("Media", MediaSchema);

module.exports = Media;

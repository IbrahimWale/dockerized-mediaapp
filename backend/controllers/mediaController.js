const asyncHandler = require("../middleware/async.js");
const Media = require("../models/MediaSchema.js");

exports.addMedia = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { title, url, creator, filetype } = req.body;
  const mediaId = req.body.id ? req.body.id : req.body.mediaId;
  const media = await Media.create({
    userId,
    filetype,
    creator,
    title,
    url,
    mediaId,
  });

  res.status(201).json({
    message: "Media save successfully",
    data: media,
  });
});

exports.getMedia = asyncHandler(async (req, res) => {
  const media = await Media.find({ userId: req.user._id });

  res.status(200).json({
    success: true,
    data: media,
  });
});

// @route     DELETE /api/v1/media/:mediaId
// @access    Private

exports.deleteMedia = asyncHandler(async (req, res) => {
  await Media.findByIdAndDelete(req.params.mediaId);
  res.status(200).json({
    success: true,
    data: {},
  });
});

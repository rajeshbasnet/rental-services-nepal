const { Comment, User, Bike } = require("../models/index");
const user = require("../models/user");

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();

    res.status(200).json({
      comments,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

exports.deleteComments = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      message: "Missing parameters id",
    });
  }

  try {
    const data = await Comment.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    await res.status(200).json({
      message: "Comments removed successfully",
      error: false,
      data,
    });
  } catch (error) {
    await res.status(400).json({
      error,
    });
  }
};

exports.postComments = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Request body empty",
    });
  }

  try {
    const comments = await Comment.create({
      comment__description: req.body.comment__description,
      UserId: req.body.user_id,
      BikeId: req.body.bike_id,
    });

    await res.status(200).json({
      message: "Comments added successfully",
      error: false,
      comments,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

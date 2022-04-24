const { Bike, Service, User } = require("../models");

exports.getAllBikes = async (request, response) => {
  try {
    const bikes = await Bike.findAll();
    await response.status(200).json({
      message: "Fetched all available bikes from all stores",
      bikes,
    });
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error occurred !",
    });
  }
};

exports.getBikeFromBikeId = async (request, response) => {
  if (!request.params.id) {
    response.status(400).send({
      message: "Missing parameters",
    });
  }

  try {
    const bike = await Bike.findByPk(request.params.id);

    if (bike) {
      const comments = await bike.getComments();

      const userComments = [];

      for (comment of comments) {
        const user = await User.findByPk(comment.UserId);
        const userComment = {
          comment_id: comment.id,
          comment__description: comment.comment__description,
          username: user.username,
          id: user.id,
        };
        userComments.push(userComment);
      }

      await response.status(200).json({
        message: "Bike successfully found !",
        error: "success",
        bike,
        comments: userComments,
      });
    } else {
      await response.status(200).json({
        message: "Cannot find bike from given id",
        error: "error",
      });
    }
  } catch (error) {
    await response.status(500).json({
      messsage: "Internal Server Error Occurred !",
    });
  }
};

exports.getAllBikesFromRentalServices = async (request, response) => {
  if (!request.params.service_id) {
    response.status(400).json({
      message: "Missing parameters service name !",
    });
  }

  try {
    const { service_id } = request.params;

    const service = await Service.findByPk(service_id);

    const bikes = await service.getBikes();

    await response.status(200).json({
      message: "Successfully fetched Bikes from rental service",
      bikes,
    });
  } catch (error) {
    response.status(500).json({
      messsage: "Internal Server Error Occurred !",
    });
  }
};

exports.postBikesForRentalService = async (request, response) => {
  if (!request.body) {
    response.status(400).json({
      message: "Request body not found !",
    });
  }

  try {
    const { bike_name, bike_price, bike_description, bike_slug, service_id } =
      request.body;

    const service = await Service.findByPk(service_id);

    const bike = {
      bike_name,
      bike_price,
      bike_description,
      bike_slug,
    };

    await service.createBike(bike);

    await response.status(200).json({
      message: "Bikes added successfully from given rental store",
      bike,
      service,
    });
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error Occurred !",
    });
  }
};

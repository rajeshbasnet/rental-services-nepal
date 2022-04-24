const { Location } = require("../models");

exports.postLocation = async (request, response) => {
  try {
    if (!request.body) {
      response.status(400).send({
        message: "Request doesn't contain body",
        body: [],
      });
    }

    if (!request.body.location_name) {
      response.status(400).send({
        message: "Request body doesn't match required type",
        body: [],
      });
    }

    const { location_name } = request.body;

    const location = await Location.create({
      location_name,
    });

    await response.status(400).send({
      message: "Location added successfully",
      location,
    });
  } catch (error) {
    response.status(500).send({
      message: error,
      body: [],
    });
  }
};

exports.getAllLocation = async (request, response) => {
  try {
    const locations = await Location.findAll();
    await response.send({
      message: "Location fetched successfully",
      body: locations,
    });
  } catch (error) {
    response.status(500).send({
      message: "Internal server error",
    });
  }
};

exports.getLocation = async (request, response) => {
  if (!request.params.location_name) {
    response.status(400).send({
      message: "Missing parameters for location",
    });
  }

  try {
    const { location_name } = request.params;

    const location = await Location.findOne({
      where: {
        location_name,
      },
    });

    response.status(200).send({
      message: "Location fetched successfully",
      location,
    });
  } catch (error) {
    response.status(500).send({
      message: "Internal server error",
    });
  }
};

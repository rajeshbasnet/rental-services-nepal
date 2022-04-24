const { Service, Location } = require("../models");

exports.getAllRentsServices = async (request, response) => {
  try {
    const services = await Service.findAll();
    await response.status(200).send({
      message: "Rent Services fetched successfully!",
      services,
    });
  } catch (error) {
    response.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.getRentServicesFromLocation = async (request, response) => {
  if (!request.params.location_name) {
    response.status(400).send({
      message: "Parameters missing !",
    });
  }

  try {
    const { location_name } = request.params;

    const locationServices = await Location.findOne({
      where: {
        location_name,
      },
      include: Service,
    });

    if (!locationServices) {
      const services = await Service.findAll();

      await response.status(200).json({
        error: "warning",
        message: "Cannot find services from given location",
        locationServices: services,
      });
    } else {
      await response.status(200).json({
        error: "success",
        message: "Services fetched successfully from given location",
        locationServices,
      });
    }
  } catch (error) {
    response.status(500).send({
      message: "Internal server error !",
    });
  }
};

exports.postRentServices = async (request, response) => {
  if (!request.body) {
    response.status(400).json({
      message: "Request body not found",
    });
  }

  try {
    const { service_name, phone_number, location_name } = request.body;

    const location = await Location.findOne({
      where: {
        location_name,
      },
    });

    const service = {
      service_name,
      phone_number,
    };

    if (location) {
      await location.createService(service);

      await response.status(200).json({
        message: "Rental Services added successfully for given location",
        service,
        location,
      });
    } else {
      const newLocation = await Location.create({
        location_name,
      });

      await newLocation.createService(service);

      await response.status(200).json({
        message: "New Rental Services and Location created successfully!",
        service,
        newLocation,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

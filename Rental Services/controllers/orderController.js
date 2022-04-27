const { Order, User, Bike } = require("../models");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({});

    const orderUserBike = [];

    for (const order of orders) {
      const user = await User.findByPk(order.UserId);
      const bike = await Bike.findByPk(order.BikeId);

      await orderUserBike.push({
        order,
        user,
        bike,
      });
    }

    await res.status(200).json({
      orderUserBike,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getOrdersFromUserId = async (req, res) => {
  try {
    if (!req.params.user_id) {
      return res.status(400).json({
        message: "Missing parameters",
      });
    }

    const userOrderBike = [];

    const user = await User.findByPk(req.params.user_id);

    const orders = await Order.findAll({
      where: {
        UserId: user.id,
        payment: false,
      },
    });

    for (order of orders) {
      const bike = await Bike.findByPk(order.BikeId);
      userOrderBike.push({
        orders: {
          order,
          bike,
        },
      });
    }

    await res.send({
      userOrderBike,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.postOrder = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        message: "Missing request body",
      });
    }

    console.log(res.body);

    const order = await Order.create({
      quantity: req.body.quantity,
      sum: req.body.sum,
      payment: false,
      UserId: req.body.user_id,
      BikeId: req.body.bike_id,
    });

    if (order) {
      res.status(200).json({
        message: "Order successfully created !",
        error: false,
      });
    } else {
      res.status(200).json({
        message: "Cannot place order !",
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.clearAllOrdersFromUserId = async (req, res) => {
  try {
    if (!req.params.user_id) {
      res.status(400).json({
        message: "Missing parameters user_id",
        error: true,
      });
    }

    const isCleared = await Order.destroy({
      where: {
        UserId: req.params.user_id,
      },
    });

    console.log(isCleared);

    res.status(200).json({
      error: success == 1 ? true : false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.clearSingleOrderFromOrderId = async (req, res) => {
  try {
    if (!req.params.order_id) {
      res.status(400).json({
        message: "Missing parameters order id",
      });
    }

    const isCleared = await Order.destroy({
      where: {
        id: req.params.order_id,
      },
    });

    res.status(200).json({
      success: isCleared == 1 ? true : false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.updatePaymentFromOrders = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        message: "Missing request body",
      });
    }

    const order = await Order(
      {
        id: req.body.order_id,
      },
      {
        where: {
          payment: true,
        },
      }
    );

    if (order) {
      res.status(200).json({
        message: "Order successfully created !",
        error: false,
      });
    } else {
      res.status(200).json({
        message: "Cannot place order !",
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

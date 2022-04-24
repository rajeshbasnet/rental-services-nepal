const bcryptjs = require("bcryptjs");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");
const user = require("../models/user");

exports.registerUser = async (request, response) => {
  if (!request.body) {
    response.status(400).json({
      message: "Request body not found",
    });
  }

  const { username, address, email, phone_number, password } = request.body;

  try {
    const userExist = await User.findAll({
      where: {
        email,
      },
    });

    if (userExist.length > 0) {
      await response.status(200).json({
        error: "warning",
        message: "User has been already created",
      });
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);

      const user = await User.create({
        username,
        address,
        email,
        phone_number,
        password: hashedPassword,
        isAdmin: false,
      });

      await response.status(201).json({
        error: "success",
        message: "User created successfully",
        user,
      });
    }
  } catch (error) {
    response.status(400).send({
      message: "Internal Server Error",
    });
  }
};

exports.loginUser = async (request, response) => {
  if (!request.body) {
    response.status(400).json({
      message: "Request body not found !",
    });
  }

  try {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      const validPassword = await bcryptjs.compare(password, user.password);

      if (validPassword) {
        const token = jwt.sign(
          {
            _id: user.id,
          },
          process.env.TOKEN_SECRET
        );

        response.status(200).header("auth-token", token).json({
          token,
          error: "success",
          message: "LoggedIn Successfully",
          isAdmin: user.isAdmin,
          id: user.id,
        });
      } else {
        response.status(200).json({
          message: "Invalid Password or Email",
          error: "error",
        });
      }
    } else {
      response.status(200).json({
        error: "not found",
        message: "Invalid Passwor or Email",
      });
    }
  } catch (error) {
    response.status(400).json({
      error,
      error: "error_occurred",
    });
  }
};

exports.getUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "Missing parameters for user",
    });
  }

  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      return res.status(200).json({
        message: "Successfully fetched user",
        user,
        error: "success",
      });
    } else {
      return res.status(200).json({
        message: "Cannot find user",
        error: "error",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Some error occurred! ",
    });
  }
};

exports.updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Request body not found",
    });
  }

  try {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      await res.status(200).send({
        message: "Email already exists",
        error: true,
      });
    } else {
      const userPassword = await bcryptjs.hash(req.body.password, 10);

      const user = await User.update(
        {
          username: req.body.username,
          address: req.body.address,
          email: req.body.email,
          phone_number: req.body.phone_number,
          password: userPassword,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      if (user) {
        await res.status(200).json({
          error: false,
          message: "User updated successfully",
        });
      } else {
        await res.status(200).json({
          error: true,
          message: "Sorry, User cannot be updated",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "Some error occurred! ",
    });
  }
};

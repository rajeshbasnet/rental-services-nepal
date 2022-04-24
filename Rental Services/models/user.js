module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "User",
    {
      username: Sequelize.STRING,
      address: Sequelize.STRING,
      email: Sequelize.STRING,
      phone_number: Sequelize.STRING,
      password: Sequelize.STRING,
      isAdmin: Sequelize.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
};

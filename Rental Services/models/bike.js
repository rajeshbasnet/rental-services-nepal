module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Bike",
    {
      bike_name: Sequelize.STRING,
      bike_price: Sequelize.STRING,
      bike_description: Sequelize.STRING,
      bike_slug: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
  );
};

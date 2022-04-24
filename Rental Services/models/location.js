module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Location",
    {
      location_name: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
  );
};

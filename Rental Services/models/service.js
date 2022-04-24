module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Service",
    {
      service_name: Sequelize.STRING,
      phone_number: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
  );
};

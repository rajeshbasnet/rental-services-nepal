module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Orders",
    {
      quantity: Sequelize.STRING,
      sum: Sequelize.STRING,
      payment: Sequelize.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
};

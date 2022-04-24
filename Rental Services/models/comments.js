module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Comments",
    {
      comment__description: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
  );
};

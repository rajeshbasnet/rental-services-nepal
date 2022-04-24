module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Work",
    {
      companyName: Sequelize.STRING,
      companyAddress: Sequelize.STRING,
      jobTitle: Sequelize.STRING,
      startDate: Sequelize.DATE,
      endDate: Sequelize.DATE,
      description: Sequelize.STRING,
      isCurrent: Sequelize.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
};

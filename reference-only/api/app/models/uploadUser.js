module.exports = (sequelize, Sequelize) => {
  const uploadUser = sequelize.define("uploadUser", {
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accountLinkTo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return uploadUser;
};

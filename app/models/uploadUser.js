module.exports = (sequelize, Sequelize) => {
  const uploadUser = sequelize.define("uploadUser", {
    studentID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: "action_unique",
    },
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

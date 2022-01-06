module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    studentID: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    DOB: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return User;
};

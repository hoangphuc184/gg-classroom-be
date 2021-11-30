module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("class", {
    className: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    teacherName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberOfStudent: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    banner: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Class;
};

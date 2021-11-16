module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("class", {
    className: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberOfStudent: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    banner: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Class;
};

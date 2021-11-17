module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("class", {
    className: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberOfStudent: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    banner: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Class;
};

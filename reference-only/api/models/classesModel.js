module.exports = (sequelize, Sequelize) => {
  const classes = sequelize.define("classes", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return classes;
};

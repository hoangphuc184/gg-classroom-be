module.exports = (sequelize, Sequelize) => {
  const Assignment = sequelize.define("assignment", {
    assignmentTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    instruction: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    point: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    scale: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    isFinal: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });

  return Assignment;
};

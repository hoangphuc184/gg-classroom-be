module.exports = (sequelize, Sequelize) => {
  const Grade = sequelize.define("grade", {
    grade: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Grade;
};

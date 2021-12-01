module.exports = (sequelize, Sequelize) => {
  const Grade = sequelize.define("grade", {
    grade: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    assignment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Grade;
};

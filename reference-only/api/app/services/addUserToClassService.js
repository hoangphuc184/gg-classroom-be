const db = require("../models");
const Class = db.classes;
const User = db.users;

exports.addUser = async (userID, classID) => {
  return Class.findByPk(classID).then((cls) => {
    if (!cls) {
      console.log("Class not found!");
      return null;
    }
    return User.findByPk(userID)
      .then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        cls.addUser(user);
        return cls;
      })
      .catch((err) => {
        console.log(">> Error while adding User to Class: ", err);
      });
  });
};
// exports.addTutorial = (tagId, tutorialId) => {
//   return Tag.findByPk(tagId)
//     .then((tag) => {
//       if (!tag) {
//         console.log("Tag not found!");
//         return null;
//       }
//       return Tutorial.findByPk(tutorialId).then((tutorial) => {
//         if (!tutorial) {
//           console.log("Tutorial not found!");
//           return null;
//         }

//         tag.addTutorial(tutorial);
//         console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
//         return tag;
//       });
//     })
//     .catch((err) => {
//       console.log(">> Error while adding Tutorial to Tag: ", err);
//     });
// };

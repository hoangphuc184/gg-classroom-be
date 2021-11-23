const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");

// - For development purpose, use these lines of code to drop table and re-sync database, then call function initial() to initialize role

// const Role = db.roles;

// function initial() {
//   Role.create({
//     id: 1,
//     name: "student"
//   });
 
//   Role.create({
//     id: 2,
//     name: "teacher"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initial();
// });

// - For production, just use sync() function to sync the database and avoid dropping data, role will need to be initialized mannually through query in database
db.sequelize.sync();


const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/authRoutes")(app);
require("./app/routes/userAuthoRoutes")(app);
require("./app/routes/userRoute")(app);
require("./app/routes/classRoute")(app);
require("./app/routes/addUserToClassRoute")(app);
require("./app/routes/assignmentRoute")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

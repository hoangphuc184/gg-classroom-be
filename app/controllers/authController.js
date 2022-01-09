const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.roles;

const Op = db.Sequelize.Op;

const authService = require("../services/authService");
const sendMail = require("./sendMail");

const { CLIENT_URL } = process.env;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_KEY, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, config.secret, {
    expiresIn: "5m",
  });
};

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    fullName: req.body.fullName,
    DOB: req.body.DOB,
    phoneNumber: req.body.phoneNumber,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({
        msg: "This email does not exist",
      });
    }

    const accessToken = createAccessToken({ id: user.id });
    const url = `${CLIENT_URL}/api/auth/reset/${accessToken}`;

    sendMail(email, url, "Reset your password")
    res.json({msg: "Re-send the password, please check your email"})
  } catch (e) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.googleSignIn = async (req, res) => {
  try {
    let payload = await authService.googleSignIn(req.query.id_token);
    res.status(200).json(payload);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.googleSignUp = async (req, res) => {
  try {
    const requiredData = req.body;
    console.log(requiredData);
    let payload = await authService.googleSignUp(
      req.query.id_token,
      requiredData
    );
    res.status(200).json(payload);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

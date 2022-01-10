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
  return jwt.sign(payload, process.env.ACCESS_KEY, {
    expiresIn: "24h",
  });
};

exports.signup = async (req, res) => {
  // Save User to Database
  await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
    fullName: req.body.fullName,
    DOB: req.body.DOB,
    phoneNumber: req.body.phoneNumber,
  })
    .then(async (user) => {
      const activationToken = createActivationToken({ id: user.id });
      const url = `${CLIENT_URL}/user/activate/${activationToken}`;
      sendMail(user.email, url, "Verify your account");
      if (req.body.roles) {
        if (req.body.roles[0] == "admin") {
          await User.update({ isVerified: true }, { where: { id: user.id } });
        }
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              message:
                "User was registered successfully! Please check your mailbox to verify your account",
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({
            message:
              "User was registered successfully! Please check your mailbox to verify your account",
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.verifyAccount = async (req, res) => {
  try {
    const { activationToken } = req.body;
    const user = jwt.verify(activationToken, process.env.ACTIVATION_KEY);
    await User.update({ isVerified: true }, { where: { id: user.id } });
    const check = await User.findOne({
      where: {
        id: user.id,
      },
    });
    if (check.isVerified == false) {
      res.status(400).json({
        msg: "Verify account fail!",
      });
    }
    res.status(200).json({
      msg: "Verify account successfully. You can get access to the web now!",
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
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
    const url = `${CLIENT_URL}/user/reset/${accessToken}`;

    sendMail(email, url, "Reset your password");
    res.json({ msg: "Re-send the password, please check your email" });
  } catch (e) {
    return res.status(500).json({
      msg: e.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(password);
    const passwordHash = await bcrypt.hash(password, 12);
    await User.update(
      {
        password: passwordHash,
      },
      {
        where: {
          id: req.userId,
        },
      }
    );
    res.status(200).json({ msg: "Password successfully changed!" });
    // console.log(req.userId);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
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

      if (!user.isVerified) {
        return res.status(401).send({
          accessToken: null,
          message: "Account is not verified",
        });
      }

      var token = createAccessToken({ id: user.id });

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

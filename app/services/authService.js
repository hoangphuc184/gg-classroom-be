const { OAuth2Client } = require("google-auth-library");
const config = require("../config/auth.config");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const db = require("../models");
const User = db.users;
const Role = db.roles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_KEY, {
    expiresIn: "24h",
  });
};

verifyGoogleToken = async (googleTokenId) => {
  const ticket = await client.verifyIdToken({
    idToken: googleTokenId,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  return payload;
};

exports.googleSignIn = async (googleTokenId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await verifyGoogleToken(googleTokenId);
      let foundUser = await User.findOne({
        where: {
          email: payload["email"],
        },
      });
      if (!foundUser) {
        resolve({
          errCode: 1,
          errMessage: `User not found! Create new user with email = ${payload["email"]}`,
        });
      } else {
        if (
          foundUser.googleId != payload["sub"] ||
          foundUser.googleId == null
        ) {
          await User.update(
            {
              googleId: payload["sub"],
              isVerified: true,
            },
            {
              where: {
                id: foundUser.id,
              },
            }
          );
        } else {
          var token = createAccessToken({ id: foundUser.id });

          var authorities = [];
          foundUser.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            resolve({
              errCode: 0,
              data: {
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email,
                roles: authorities,
                accessToken: token,
              },
            });
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.googleSignUp = async (googleTokenId, requiredData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await verifyGoogleToken(googleTokenId);
      console.log(payload);
      let createdUser = await User.create({
        username: requiredData.username,
        password: bcrypt.hashSync(requiredData.password, 8),
        fullName: payload["name"],
        email: payload["email"],
        googleId: payload["sub"],
        DOB: requiredData.DOB,
        phoneNumber: requiredData.phoneNumber,
      });
      if (requiredData.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: requiredData.roles,
            },
          },
        }).then((roles) => {
          createdUser.setRoles(roles);
        });
      } else {
        // user role = 1
        createdUser.setRoles([1]);
      }
      resolve({
        errCode: 0,
        errMessage: "User was registered successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios')
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const createUser = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({ id: createUser.id, email: createUser.email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if(!email || !password){
        throw {name: "Email/password is required"}
      }
      const getLogin = await User.findOne({ where: {email} });
      if (!getLogin) {
        throw { name: "Email/password is invalid" };
      }

      const isValidPassword = bcrypt.compareSync(password, getLogin.password);
      if (!isValidPassword) {
        throw { name: "Email/password is invalid" };
      }

      const payload = {
        id: getLogin.id,
        email: getLogin.email,
      };
      const access_token = jwt.sign(payload, "SECRET");
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async home(req, res, next){
    try {
        const {data} = await axios.get("https://www.freetogame.com/api/games")
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: "809525062533-kc419u49oejm7b3g8m0p2u9q332tdh5m.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.username,
          email: payload.email,
          password: Math.random() * 10000,
        },
        hooks: false,
      });

      let access_token = jwt.sign({ id: user.id, email: user.email }, "SECRET")
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;

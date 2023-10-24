const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios')

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
}

module.exports = Controller;

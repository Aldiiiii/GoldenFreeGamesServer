const { User, Collection } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
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
      if (!email || !password) {
        throw { name: "Email/password is required" };
      }
      const getLogin = await User.findOne({ where: { email } });
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
  static async home(req, res, next) {
    try {
      const { page } = req.query;
      let reqPage = 1;
      if (page) {
        reqPage = page;
      }

      const { data } = await axios.get("https://www.freetogame.com/api/games");

      const perPage = 12;
      function getCurrentPageItems(num) {
        return data.slice((num - 1) * perPage, perPage * num);
      }

      res.status(200).json({
        data: getCurrentPageItems(reqPage),
        totalPage: Math.ceil(data.length / perPage),
        currentPage: reqPage,
      });
    } catch (error) {
      next(error);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience:
          "809525062533-kc419u49oejm7b3g8m0p2u9q332tdh5m.apps.googleusercontent.com",
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

      let access_token = jwt.sign({ id: user.id, email: user.email }, "SECRET");
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async collections(req, res, next) {
    try {
      const UserId = req.user.id
      const  data = await Collection.findAll({
        where: {UserId},
        order: [['id', 'ASC']]
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }

  }
  static async addCollections(req, res, next) {
    try {
      const UserId = req.user.id;
      console.log(req.user,` <<< INI DI ADD`)
      const {
        id,
        title,
        thumbnail,
        short_description,
        game_url,
        genre,
        platform,
        publisher,
        developer,
        release_date,
        freetogame_profile_url,
      } = req.body;
      const data = await Collection.create({
        UserId,
        GamesId: id,
        title,
        thumbnail,
        short_description,
        game_url,
        genre,
        platform,
        publisher,
        developer,
        release_date,
        freetogame_profile_url,
      });
      res.status(201).json(data)
    } catch (error) {
      next(error);
    }
  }
  static async changeStatus(req, res, next) {
    try {
      const { newStatus, collectionId } = req.body
      const collection = await Collection.findByPk(collectionId)
      if(!collection) throw {name: "Data not found"}
      const update = await Collection.update({status: newStatus}, {
        where: {
          id: collectionId
        }
      })
      res.status(200).json(update)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async gamesById(req, res, next) {
    try {
      const { id } = req.params
      const { data } = await axios.get("https://www.freetogame.com/api/game?id=" + id);
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;

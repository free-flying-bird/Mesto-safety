const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { safeKey } = require('../safeKey');

module.exports.getUsers = (req, res) => {
  User.find({})
    // eslint-disable-next-line arrow-parens
    .then(users => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы  данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'Введите пароль' });
  }
  if (!/\S{8,}/.test(password)) {
    return res.status(400).send({ message: 'Введите пароль не менее 8 знаков' });
  }
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(401).send({ message: 'Заполните все необходимые данные' });
      }
      if (err.name === 'MongoError' || err.code === 11000) {
        return res.status(409).send({ message: 'Пользователь с таким Email уже существует' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, safeKey(), {});
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).send({ message: 'Успешная авторизация' })
        .end();
    })
    .catch(() => {
      res.status(400).send({ message: 'Неверная почта или пароль' });
    });
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('notFound'))
    // eslint-disable-next-line arrow-parens
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err === 'notFound') {
        res.status(404).send({ message: 'Нет пользователя с таким ID' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

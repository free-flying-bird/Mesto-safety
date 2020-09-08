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
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    // eslint-disable-next-line arrow-parens
    .then(hash => User.create({
      email: req.body.email,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      password: hash,
    }))
    // eslint-disable-next-line arrow-parens
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, safeKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch(() => {
      res.status(401).send({ message: 'Неверная почта или пароль' });
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

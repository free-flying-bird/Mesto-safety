const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsersById, getUsers } = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUsersById);

module.exports = usersRouter;

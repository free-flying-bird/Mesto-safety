const usersRouter = require('express').Router();
const { getUsersById, getUsers } = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getUsersById);

module.exports = usersRouter;

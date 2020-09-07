const usersRouter = require('express').Router();
const { getUsersById, createUser, getUsers } = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.post('/users', createUser);

usersRouter.get('/users/:id', getUsersById);

module.exports = usersRouter;

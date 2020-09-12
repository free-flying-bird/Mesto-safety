const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^http[s]?:\/{2}(w{3}\.)?(([a-z0-9]+[a-z0-9-_]*(\.[a-z0-9]+[a-z0-9-_]*)*(\.[a-z]+))|(\d+(\.\d+){1,4}))(:\d+)?(\/[a-z0-9_-]+)*\/?#?/),
  }),
}), createCard);

cardsRouter.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);

module.exports = cardsRouter;

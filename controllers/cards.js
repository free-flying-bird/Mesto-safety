const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    // eslint-disable-next-line arrow-parens
    .then(cards => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    // eslint-disable-next-line arrow-parens
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      const { owner } = card;
      if (req.user._id === owner.toString()) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.send({ message: 'Карточка успешно удалена' }));
      } throw new ForbiddenError('Нет доступа');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new AuthError('Переданы некорректные данные');
      } else next(err);
    })
    .catch(next);
};

const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    // eslint-disable-next-line arrow-parens
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user.id;
  Card.create({ name, link, owner: userId })
    // eslint-disable-next-line arrow-parens
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    // eslint-disable-next-line arrow-parens
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет карточки с таким ID' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

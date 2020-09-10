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
  const userId = req.user._id;
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
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      const { owner } = card;
      if (req.user._id === owner.toString()) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.send({ message: 'Карточка успешно удалена' }));
      } else {
        res.status(403).send({ message: 'Нет доступа' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(401).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

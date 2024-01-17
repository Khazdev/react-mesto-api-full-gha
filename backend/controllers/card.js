const Card = require('../models/card');
const {
  CREATED_SUCCESS,
} = require('../constants/errors');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_SUCCESS).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards.reverse()))
    .catch((err) => next(err));
};

const findAndDeleteCard = (cardId, userId) => Card.findOne({ _id: cardId })
  .orFail(new NotFoundError('Карточка не найдена'))
  .then(async (card) => {
    if (card.owner.toString() !== userId.toString()) {
      throw new ForbiddenError('У вас нет прав на удаление этой карточки');
    }
    return card.deleteOne();
  });

const updateCardLikes = (cardId, userId, updateData) => Card.findByIdAndUpdate(
  cardId,
  updateData,
  { new: true },
)
  .populate([{ path: 'likes', model: 'user' }])
  .orFail(new NotFoundError('Карточка не найдена'));

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  findAndDeleteCard(cardId, req.user._id)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь не найден'));
      } else next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  updateCardLikes(cardId, req.user._id, { $addToSet: { likes: req.user._id } })
    .then((updatedCard) => res.send(updatedCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь не найден'));
      } else next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  updateCardLikes(cardId, req.user._id, { $pull: { likes: req.user._id } })
    .then((updatedCard) => res.send(updatedCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь не найден'));
      } else next(err);
    });
};

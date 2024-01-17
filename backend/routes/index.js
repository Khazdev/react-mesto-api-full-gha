const express = require('express');
const userRoutes = require('./user');
const cardRoutes = require('./card');
const authentication = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(authentication);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', () => {
  throw new NotFoundError('Здесь ничего нет :)');
});
module.exports = router;

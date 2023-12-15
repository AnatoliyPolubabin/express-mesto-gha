/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable eol-last */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable function-paren-newline */
/* eslint-disable semi */

const User = require('../models/user');
const { HTTP_STATUS_CODES } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error }));
};

const getUserId = (req, res) => {
  const id = req.params.id;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(HTTP_STATUS_CODES.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'не найден пользователь ' });
        return;
      }
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(HTTP_STATUS_CODES.CREATED).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Неверно' });
        return;
      }
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка' });
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Неверные данный' });
      }
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Неверные данные' });
      }
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = { getUsers, getUserId, createUser, updateUser, updateAvatar };

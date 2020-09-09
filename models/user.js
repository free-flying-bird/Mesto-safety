const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validator: (v) => /^[a-z0-9]+((\.|-|_)[a-z0-9]+)*@[a-z0-9]+((\.|-)[a-z0-9]+)*(\.[a-z]+)/.test(v),
    message: (props) => `${props.value} некорректный адрес электронной почты`,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /^http[s]?:\/{2}(w{3}\.)?(([a-z0-9]+[a-z0-9-_]*(\.[a-z0-9]+[a-z0-9-_]*)*(\.[a-z]+))|(\d+(\.\d+){1,4}))(:\d+)?(\/[a-z0-9_-]+)*\/?#?/.test(v),
      message: (props) => `${props.value} неправильная ссылка на картинку`,
    },
    required: true,
  },
},
{ versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

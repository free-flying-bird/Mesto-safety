const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => /^http[s]?:\/{2}(w{3}\.)?(([a-z0-9]+[a-z0-9-_]*(\.[a-z0-9]+[a-z0-9-_]*)*(\.[a-z]+))|(\d+(\.\d+){1,4}))(:\d+)?(\/[a-z0-9_-]+)*\/?#?/.test(v),
      message: (props) => `${props.value} неправильная ссылка на картинку`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{ versionKey: false });

module.exports = mongoose.model('card', cardSchema);

const mongoose = require('mongoose');
const User = require('../models/users.model');
const List = require('../models/list.model');

exports.dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI)
}


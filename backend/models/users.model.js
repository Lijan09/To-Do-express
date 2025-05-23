const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const validator = {
    validator: function (password) {
        return password.length >= 8;
    },
    message: "Password must be at least 8 characters long"

    
}

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false,
        validate: validator
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }

})

userSchema.pre('save', async function (next) { 
    if (!this.isModified(password)){
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
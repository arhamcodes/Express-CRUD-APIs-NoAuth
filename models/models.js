const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 225
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 225
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 225
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const user = mongoose.model('User', userSchema);
module.exports = user;
const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
    
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: Number,
        required: true,
      
    }
});

const authUser = mongoose.model('auth', authUserSchema);

module.exports = authUser;


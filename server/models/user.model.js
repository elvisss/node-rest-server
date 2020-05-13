const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValids = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not valid role'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is mandatory']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email field is mandatory']
    },
    password: {
        type: String,
        required: [true, 'Password field is mandatory']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValids
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin( uniqueValidator, {
    message: '{PATH} must to be unique'
});

module.exports = mongoose.model('user', userSchema);

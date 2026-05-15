const { createHmac, randomBytes } = require('node:crypto');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        salt: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImageUrl: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
        },
    }, 
    {
        timestamps: true,
    }
);

userSchema.pre('save', function (next) {
    const user = this;

    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

const User = model('user', userSchema);

module.exports = User;

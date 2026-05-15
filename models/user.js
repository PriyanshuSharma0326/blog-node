const { createHmac, randomBytes } = require('node:crypto');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
}, {
        timestamps: true,
});

userSchema.pre('save', async function () {
    const user = this;

    if (!user.isModified('password')) {
        return;
    }

    const salt = randomBytes(16).toString('hex');

    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    user.salt = salt;
    user.password = hashedPassword;
});

userSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({ email });

    if(!user) {
        throw new Error('User not found.');
    }

    const storedPassword = user.password;

    const hashedPassword = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');

    if(storedPassword === hashedPassword) {
        const { password, salt, ...remainingUser } = user._doc;
        return remainingUser;
    }
    else {
        throw new Error('Incorrect password.');
    }
});

const User = model('user', userSchema);

module.exports = User;

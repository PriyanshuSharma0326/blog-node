const mongoose = require('mongoose');

async function connectMongoDB(url) {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected with Mongo DB");
        }).catch(err => {
            console.error(err);
        });
}

module.exports = connectMongoDB;

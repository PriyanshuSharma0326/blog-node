const mongoose = require('mongoose');

async function connectMongoDB(url) {
    mongoose.connect('mongodb://127.0.0.1:27017/blog-app-demo')
        .then(() => {
            console.log("Connected with Mongo DB");
        }).catch(err => {
            console.error(err);
        });
}

module.exports = connectMongoDB;

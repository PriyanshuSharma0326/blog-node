require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const connectMongoDB = require("./connection");
const { verifyAuthCookie } = require("./middlewares/auth");

const app = express();

connectMongoDB();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));
app.use(verifyAuthCookie('uid'));

app.use('/', staticRoute);
app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
});

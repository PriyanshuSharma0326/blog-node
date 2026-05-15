require("dotenv").config();

const express = require('express');
const path = require('path');
const staticRoute = require("./routes/staticRoute");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));

app.use('/', staticRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
});

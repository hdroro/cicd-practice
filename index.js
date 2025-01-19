const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes.js');
const errorHandler = require("./src/middlewares/error.js");
const { configurePassport } = require('./src/config/passport.js');
// const passport = require('passport');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);
app.use(errorHandler);

// app.use(passport.initialize());
// configurePassport(passport)

app.use((req, res) => {
    res.status(404).send('<h1>404 - Not found</h1>');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// external imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

// internal imports
const todoRouter = require("./router/todoRouter");

// make connection to database
mongoose
  .connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful! 🎉"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set template engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// set router
app.use("/", todoRouter);

// start the server
app.listen(process.env.PORT, () =>
  console.log(`application is listening on port ${process.env.PORT} ✨🎉`)
);

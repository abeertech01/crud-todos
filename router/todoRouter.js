// external imports
const express = require("express");
const router = express.Router();

// internal imports
const Todo = require("../models/Todo");

router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.render("todos", {
      title: "Task List",
      todos,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error Occurred while retriving user information",
    });
  }
});

router.post("/", async (req, res, next) => {
  let newTodo;

  newTodo = new Todo({
    ...req.body,
  });

  try {
    await newTodo.save();
    const todos = await Todo.find();
    res.render("todos", {
      title: "Task List",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured! 🧨🧨",
        },
      },
    });
  }
});

module.exports = router;

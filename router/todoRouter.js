// external imports
const express = require("express");
const router = express.Router();

// internal imports
const Todo = require("../models/Todo");

router.get("/", (req, res, next) => {
  res.render("todos", {
    title: "Task List",
  });
});

router.post("/", async (req, res, next) => {
  let newTodo;

  newTodo = new Todo({
    ...req.body,
  });

  try {
    const result = await newTodo.save();
    res.render("todos", {
      title: "Task List",
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

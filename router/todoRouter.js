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

  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

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

router.put("/:id", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  try {
    const response = await Todo.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        useFindAndModify: false,
      }
    );
    if (!response) {
      res.status(404).send({
        message: `Cannot Update user with ${id}. Maybe todo not found!`,
      });
    } else {
      const todos = await Todo.find();
      res.render("todos", {
        title: "Task List",
        todos,
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Error Update user information" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const response = await Todo.findByIdAndDelete(id);
    if (!response) {
      res
        .status(404)
        .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
    } else {
      const todos = await Todo.find();
      res.render("todos", {
        title: "Task List",
        todos,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete todo with id " + id,
    });
  }
});

module.exports = router;

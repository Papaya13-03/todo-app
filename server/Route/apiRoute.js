const route = require("express").Router();
const jwt = require("jsonwebtoken");
const Task = require("../Model/Task");
require("dotenv").config();

async function getTask(userId) {
  const data = await Task.find({ ownerId: userId });
  return data;
}

async function addTask(task) {
  const data = new Task(task);
  await data.save();
  return data;
}

async function updateTask(newTask) {
  await Task.updateOne({ _id: newTask._id }, newTask);
}

async function deleteTask(task) {
  await Task.deleteOne(task);
}

route.get("/", (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  getTask(user._id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

route.post("/add", (req, res) => {
  const token = req.headers.authorization;
  const text = req.body.text;
  const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);
  addTask({ text, done: false, ownerId: userId._id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Server error");
    });
});

route.put("/", (req, res) => {
  const newTask = req.body.newTask;
  updateTask(newTask);
  res.json("Update complete!");
});

route.delete("/", (req, res) => {
  const task = req.body.task;
  deleteTask(task);
  res.json("Delete complete!");
});

module.exports = route;

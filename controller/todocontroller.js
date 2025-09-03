const Todo = require("../models/todo");

exports.createTodo = async (req, res) => {
  try {
    const { task, deadline, priority, completed } = req.body;
    const newTodo = new Todo({
      task,
      deadline,
      priority: priority || "medium",
      completed: completed || false,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, deadline, priority, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, deadline, priority, completed },
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) 
      return res.status(400).json({ message: "Invalid Todo ID" });
    
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.toggleAll = async (req, res) => {
  try {
    const { completed } = req.body;
    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "Completed must be true or false" });
    }
    await Todo.updateMany({}, { completed });
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

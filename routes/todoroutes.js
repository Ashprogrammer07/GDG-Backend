const todocontroller = require("./../controller/todocontroller");
const express = require("express");
const router = express.Router();

router.post('/addtodo', todocontroller.createTodo);
router.get('/gettodos', todocontroller.getTodos);
router.put('/updatetodo/:id', todocontroller.updateTodo);
router.delete('/deletetodo/:id', todocontroller.deleteTodo);
router.put('/toggle/:id',todocontroller.toggleTodo)
router.put('/toggleAll',todocontroller.toggleAll)

module.exports = router;
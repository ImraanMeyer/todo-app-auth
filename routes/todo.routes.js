const express = require('express');
const router = express.Router();

// Import requireSignin middlewear
const { requireSignin } = require('../controllers/auth.controllers');

// Import Controllers
const { viewTodos, createTodo, deleteTodo } = require('../controllers/todo.controllers')

router.get('/todos', requireSignin, viewTodos)
router.post('/todos/new', requireSignin, createTodo)
router.delete('/todos/:_id', requireSignin, deleteTodo)

module.exports = router
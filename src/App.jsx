import React, { useState } from 'react';
import './App.css'
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        text: inputText.trim(),
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  } 

  return (
    <>
      <div id="parent">
      <header>
        <h1>Hello, welcome to my to-do list</h1>
      </header>
        <input 
          id="input-task"
          value={inputText} 
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text" 
          placeholder="Enter task to-do"
        />
        <button onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <ol id="list-parent">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ol>
    </>
  );
};

export default TodoList;

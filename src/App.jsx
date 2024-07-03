import React, { useState, useEffect } from 'react';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'




const TodoList = () => {
  // state to hold the list of todos and the current input text
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  // Function to persist todos in localStorage
  const persistData = (updatedTodos) => {
    // local storage allows you to store data as key, value pairs
    localStorage.setItem('todos', JSON.stringify({ todos: updatedTodos })); // if value is not a string, you need to use json.stringify to convert to a string
  };

  // handler to update input text state based on user input
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // hanlder to add a new todo to the list
  const handleAddTodo = () => {
    //check if input text is not empty
    if (inputText.trim() !== '') {
      //create a new todo object with an id, text, and completed status
      const newTodo = {
        id: todos.length + 1,
        text: inputText,
        completed: false
      };
      // Update todos state by adding the new todo to the existing list
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      // persist updated todos to local storage
      persistData(updatedTodos)
      //update todos state by adding the new todo to the existing lsit
      setTodos([...todos, newTodo]);
      // clear the input text state
      setInputText('');
    }
  };

    // handler to toggle the complete status of a todo
  const handleDeleteTodo = (id) => {
    // map through todos and toggle the complete status of the todo with matching id
    const updatedTodos = todos.filter(todo => todo.id !== id);
    persistData(updatedTodos)
    // update todos state with the updated list
    setTodos(updatedTodos);
  };

  // handler to toggle completed status of a todo
  const handleToggleComplete = (id) => {
    // map through todos and toggle the completed status of the todo with matching id
    const updatedTodos = todos.map(todo => 
      todo.id === id? {...todo, completed: !todo.completed } : todo
    );
    // update todos state with the updated list
    setTodos(updatedTodos)
    // persist updated todos to local storage
    persistData(updatedTodos)
  }

// handler to add a todo when enter key is pressed 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  } 

   // useEffect to load todos from localStorage on component mount
   useEffect(() => {
    // Check if localStorage is available
    if (!localStorage) {
      return;
    }

    // Retrieve todos from localStorage
    const localTodos = localStorage.getItem('todos');
    if (localTodos) {
      // Parse stored todos and set them to state
      setTodos(JSON.parse(localTodos).todos);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div id="parent">
      <header>
        <h1>Hello, welcome to my to-do list</h1>
      </header>
      {/* input field to enter new todos */}
        <input 
          id="input-task"
          value={inputText} 
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text" 
          placeholder="Enter task to-do"
        />
         {/* Button to add new todo */}
        <Button variant='outline-light' onClick={handleAddTodo}>
          Add Todo
        </Button>
      </div>
      {/* List of todos */}
      <ol id="list-parent">
         {/* Map through todos array to render each todo */}
      {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {/* Display todo text with strikethrough if completed */}
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            {/* Button to toggle completion status */}
            <Button variant='outline-primary' onClick={() => handleToggleComplete(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </Button>
            {/* Button to delete todo */}
            <Button variant='outline-danger' onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ol>
    </>
  );
};

export default TodoList;

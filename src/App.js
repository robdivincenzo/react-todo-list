import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'toDoApp.todos';

function App() {
  const [todos, setToDos] = useState([]);
  const toDoNameRef = useRef();

  useEffect(() => {
    const storedToDos = JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) );
    if( storedToDos ) {
      setToDos( storedToDos );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify(todos) );
  }, [todos]);

  function toggleToDo(id){
    const newToDos = [...todos];
    const todo = newToDos.find( todo => todo.id === id );
    todo.complete = !todo.complete;
    setToDos(newToDos);
  }
  function handleClearToDos() {
    const newToDos = todos.filter(todo => !todo.complete);
    setToDos( newToDos );
  }
  function handleAddToDo(e) {
    const name = toDoNameRef.current.value;
    if (name === '' ) return;
    setToDos( prevToDos => {
      return [...prevToDos, { id: uuidv4(), name: name, complete: false }]
    });
    toDoNameRef.current.value = '';
  }
  return (
    <>
      <ToDoList todos={todos} toggleToDo={toggleToDo}/>
      <input ref={toDoNameRef} type="text" />
      <button onClick={handleAddToDo}>Add ToDo</button>
      <button onClick={handleClearToDos}>Clear ToDo</button>
      <div>{todos.filter(todos => !todos.complete).length} left to do</div>
    </>
  );
}

export default App;

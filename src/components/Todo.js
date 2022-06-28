import React, { useState } from 'react';
import TodoForm from './TodoForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {Link} from 'react-router-dom'
const Todo = ({ todos, completeTodo, removeTodo, updateTodo, ifTitle, idValue}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  
  return (
    <>
      {todos.map((todo, index) => (idValue ? (
        <div>
          {todo.id == idValue ? (
			<div className='todo-title'>
			<h1>{todo.text}</h1>
			<EditIcon
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className='edit-icon'
          	/></div>
			) :(
			null)
		  }
          
        </div>
      ):(
        <div
        className={todo.isComplete == "1" ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        {/* <div key={todo.id} onClick={() => completeTodo(todo.id)}> complete</div> */}
    <Link to={`card/${todo.id}`} >{todo.text}</Link>
        <div className='icons'>
          <DeleteIcon
            onClick={() => removeTodo(todo.id)}
            className='delete-icon'
          />
          <EditIcon
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className='edit-icon'
          />
          <CheckCircleIcon
            onClick={() => completeTodo(todo.id, todo.isComplete)}
            className='edit-icon'
          />
        </div>
      </div>
      )))}
    </>
  );
};

export default Todo;

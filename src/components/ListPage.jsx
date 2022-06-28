import React, {useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Note from './Note'
import TodoForm from './TodoForm'
import Todo from './Todo';
import TodoList from "./TodoList.jsx"


const ListPage = (props) => {
  const { id } = useParams()
  const [notes, setNotes] = useState([])
  const [todos, setTodos] = useState([])
  const {ifTitle} = 1

  useEffect(() => {
    const getList = async () => {
      let response = await fetch(`http://localhost:5000/notes?list_like=${id}`) //filter by list id
      let data = await response.json()
      setNotes(data)
    }
    getList()

    const fetchTodos = async () => {
      let response = await fetch('http://localhost:5000/lists')
      let data = await response.json()
      setTodos(data)

    } 
    fetchTodos()

  }, [])

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    let response = await fetch(`http://localhost:5000/lists/${todoId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "text": newValue.text,
        }
      )
    })
    let data = await response.json()

    newValue = {
      "id": data.id,
      "text": data.text,
      "isComplete": data.isComplete,
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const addNote = async (note) => {
    let reponse = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          // "body": noteValue,
          "body": note.text,
          "list": id,
          "isComplete": 0,
        }
      )
    })

    let data = await reponse.json()
    console.log(data.id)
    note = {
      "id": data.id,
      "body": data.body,
      "isComplete": data.isComplete
    }
    const newNotes = [...notes, note];
    setNotes(newNotes);
  }

  const editNote = async (noteId, newText) => {

    let response = await fetch(`http://localhost:5000/lists/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "body": newText.body,
        }
      )
    })

    let data = await response.json()

    newText = {
      "id": data.id,
      "body": data.body,
      "isComplete": data.isComplete,
    }
    setNotes(prev => prev.map(item => (item.id === noteId ? newText : item)));
  };

  const deleteNote = async (id) => {
    const removedArr = [...notes].filter(note => note.id !== id);

    let reponse = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    })

    setNotes(removedArr);
  }


  const completeNote = async (id, isComplete) => {
    let response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "isComplete": !isComplete,
        }
      )
    })
    let updatedNotes = notes.map(note => {
      if (note.id === id) {
        note.isComplete = !note.isComplete;
      }
      return note;
    });


    setNotes(updatedNotes);
  }

  return (
    <>
      <h1></h1>
      <div className = 'todo-lists'>      
        <Todo
        todos = {todos}
        updateTodo = {updateTodo}
        ifTitle = {ifTitle}
        idValue = {id}
        />
        <TodoForm onSubmit={addNote} />
        <div className='all-todos'>
          <Note
            notes={notes}
            completeNote={completeNote}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        </div>
      </div>
    </>
  );
}

export default ListPage;

import React, { useState } from 'react';
import TodoForm from './TodoForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Note = ({ notes, completeNote, deleteNote, editNote }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
        });

        const submitUpdate = value => {
        editNote(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
        };


        if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
        }
    

  return notes.map((note, index) => (
      <div
        className={note.isComplete == "1" ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        {/* <div key={note.id} onClick={() => completeNote(note.id)}> complete</div> */}
        <p>{note.body}</p>
        <div className='icons'>
          <DeleteIcon
            onClick={() => deleteNote(note.id)}
            className='delete-icon'
          />
          <EditIcon
            onClick={() => setEdit({ id: note.id, value: note.body })}
            className='edit-icon'
          />
          <CheckCircleIcon
            onClick={() => completeNote(note.id, note.isComplete)}
            className='edit-icon'
          />
        </div>
      </div>
     
  ));
};

export default Note;

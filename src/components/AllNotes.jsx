import React, { useEffect, useState } from 'react'
import '../CSS/allNotes.css'
import { useSelector, useDispatch } from 'react-redux'
import Note from './Note';
import AddNote from './AddNote';
import EditNote from './EditNote';
import { removeNote, setFormVisibility, setselectedNoteIndex } from '../redux/notebookSlice';


export default function AllNotes() {

  //control edit form visibility
  const [showEditForm, setShowEditForm] = useState(false);

  const { notebooks, selectedNotebookId, formVisibility, selectedNoteIndex } = useSelector(state => state.notebook);

  const dispatch = useDispatch();

  const selectedNotebook = notebooks?.find(notebook => notebook.id === selectedNotebookId);

  const notes = selectedNotebook ? selectedNotebook.notes : [];

  //when a note clicked -> editing and deleting a note.

  const handleCancel = () => {
    setShowEditForm(false);
    dispatch(setFormVisibility(false))
  }

  const handleDeleteClick = (index) => {
    dispatch(removeNote({ selectedNotebookId, selectedNoteIndex: index }))
    dispatch(setFormVisibility(false))
  }

  const handleEditClick = (note, index) => {
    dispatch(setselectedNoteIndex(index))
    setShowEditForm(true)
    dispatch(setFormVisibility(true));
  }

  return (
    <div className='allNotes-wrapper'>
      {notes.map((note, index) => (
        <div
          className="note-wrapper" key={index}>
          <Note
            title={note.title}
            content={note.content}
            createdAt={note.createdAt}
            handleClickDelete={() => handleDeleteClick(index)}
            handleClickEdit={() => handleEditClick(note, index)}
          />
        </div>
      ))}
      {formVisibility && < div className='addNote-wrapper'> <AddNote /> </div>}

      {
        showEditForm && selectedNotebook && (
          <div className='addNote-wrapper'>
            <EditNote onCancel={handleCancel} />
          </div>
        )
      }

    </div >
  )
}

import React, { useState } from 'react'
import { MdError } from "react-icons/md";
import '../CSS/editNote.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateNote, setFormVisibility } from '../redux/notebookSlice';


export default function EditNote({ onCancel }) {

    const dispatch = useDispatch();
    const { notebooks, selectedNotebookId, selectedNoteIndex } = useSelector(state => state.notebook);
    const selectedNotebook = notebooks.find(notebook => notebook.id === selectedNotebookId);
    const selectedNote = selectedNotebook ? selectedNotebook.notes[selectedNoteIndex] : null;


    const [input, setinput] = useState({
        title: selectedNote ? selectedNote.title : '',
        content: selectedNote ? selectedNote.content : '',
    })


    //checking if the input is empty-----
    const [isError, setIsError] = useState(false);

    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.title === '' || input.content === '') {
            setIsError(true);
            return;
        }

        dispatch(updateNote({
            selectedNotebookId,
            selectedNoteIndex,
            updatedNote: {
                title: input.title,
                content: input.content,
            }
        }))
        dispatch(setFormVisibility(false))
        onCancel();
    }


    return (
        <div className='addnote-wrapper'>
            <form className='form-wrapper'>
                <input
                placeholder='Title...'
                    type="text"
                    value={input.title}
                    onChange={(e) => setinput({ ...input, title: e.target.value })}
                />
                <textarea
                    value={input.content}
                    placeholder='Add your note...'
                    onChange={(e) => setinput({ ...input, content: e.target.value })}
                ></textarea>

                {/* -----ERROR SECTION--- */}
                {isError && <div className='error error-pos-editnote'>
                    <MdError />
                    <p>Title and content cannot be empty!</p></div>}


                <div className='form-btn-wrapper'>
                    <button className='save-btn'
                        onClick={handleSubmit}>Save</button>

                    <button className='cancel-btn'
                        onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

import React, { useState } from 'react'
import '../CSS/addNote.css'
import { useDispatch, useSelector } from 'react-redux'
import { addNoteToNotebook, setFormVisibility } from '../redux/notebookSlice';
import ExitConfirmation from './ExitConfirmation';
export default function AddNote() {
    const [input, setinput] = useState({
        title: "",
        content: "",
    })

    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)

    const { notebooks, selectedNotebookId } = useSelector((state) => state.notebook);
    console.log(notebooks);

    const dispatch = useDispatch();


    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            title: input.title,
            content: input.content,
        }
        console.log(newNote);
        //checking that the title and content should not me empty
        if (newNote.content.length > 0 && newNote.title.length > 0) {
            dispatch(addNoteToNotebook({ selectedNotebookId, newNote }))
        }

        if (newNote.content.length !== 0 && newNote.title.length !== 0) dispatch(setFormVisibility(false))
    }


    const handleCancel = (e) => {
        e.preventDefault();
        setShowCancelConfirmation(true)
        console.log("hjhfdifds");
    }
    const yesHandler = () => {
        dispatch(setFormVisibility(false))
    }
    const noHandler = () => {
        setShowCancelConfirmation(false)
    }


    return (
        <div className='addnote-wrapper'>
            <form className='form-wrapper'>
                <input
                    type="text"
                    onChange={(e) => setinput({ ...input, title: e.target.value })}
                />

                <textarea
                    placeholder='Add your note..'
                    onChange={(e) => setinput({ ...input, content: e.target.value })}
                ></textarea>

                <div className='form-btn-wrapper'>
                    <button className='save-btn'
                        onClick={handleSubmit}>Save</button>

                    <button className='cancel-btn'
                        onClick={handleCancel}>Cancel</button>
                </div>
            </form>


            {showCancelConfirmation &&
                <div className='exit-confirmation-wrapper'>
                    <ExitConfirmation yesHandler={yesHandler} noHandler={noHandler} />
                </div>
            }

        </div>
    )
}

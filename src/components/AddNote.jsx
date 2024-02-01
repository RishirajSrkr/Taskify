import React, { useState } from 'react'
import '../CSS/addNote.css'
import { useDispatch, useSelector } from 'react-redux'
import { MdError } from "react-icons/md";
import { addNoteToNotebook, setFormVisibility } from '../redux/notebookSlice';
import ExitConfirmation from './ExitConfirmation';
export default function AddNote() {
    
    const [input, setinput] = useState({
        title: "",
        content: "",
    })

    //checking if the input is empty-----
    const [isError, setIsError] = useState(false);

    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)

    const { notebooks, selectedNotebookId } = useSelector((state) => state.notebook);

    const dispatch = useDispatch();


    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.title === '' || input.content === '') {
            setIsError(true);
            return;
        }

        const newNote = {
            title: input.title,
            content: input.content,
        }
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



    console.log("Add Note");

    return (
        <div className='addnote-wrapper'>
            <form className='form-wrapper'>
                <input
                placeholder='What do you want to name it?'
                    type="text"
                    onChange={(e) => setinput({ ...input, title: e.target.value })}
                />

                <textarea
                    placeholder="What's on your mind?"
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
                        onClick={handleCancel}>Cancel</button>
                </div>
            </form>


            {showCancelConfirmation &&
                <div>
                    <ExitConfirmation yesHandler={yesHandler} noHandler={noHandler} />
                </div>
            }

        </div>
    )
}

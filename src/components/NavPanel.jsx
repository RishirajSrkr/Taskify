import React, { useEffect, useState } from 'react'
import '../CSS/NavPanel.css'
import { useSelector, useDispatch } from 'react-redux'
import { addNoteToNotebook, addNotebook, setFormVisibility } from '../redux/notebookSlice';
import NoteBook from './NoteBook';
import { MdLibraryAdd } from "react-icons/md";

export default function NavPanel() {

    const dispatch = useDispatch();

    //checking error
    const [isError, setIsError] = useState(false)

    //showing notebook name input form
    const [showform, setshowform] = useState(false)

    //taking notebook name input
    const [input, setinput] = useState('');

    //fetching state(notebook) from store
    const { notebooks, selectedNotebookId } = useSelector((state) => state.notebook);

    //add a new notebook to the global state
    const noteBookButtonHandler = () => {

        //show form for user to input the new notebook name.
        setshowform(true);

        //so when add notebook button is clicked a new notebook object is pushed into the state.
        // const notebook = {
        //     id: Date.now().toString(36),
        //     name: input,
        //     notes: [],
        // }
        // dispatch(addNotebook(notebook))
    }



    //displaying ERROR MESSAGE:: PLEASE SELECT A NOTEBOOK BEFORE CREATING A NOTE'
    useEffect(() => {
        //if a notebook is selected than the user can create a note.
        if (selectedNotebookId) setIsError(false)
    }, [selectedNotebookId])


    const newNoteHandler = () => {
        //if no notebook is selected than the user cannot create a note.
        if (!selectedNotebookId) {
            setIsError(true)
        }
        else
            dispatch(setFormVisibility(true));
    }
    console.log(input);

    const notebookNameInputHandler = () => {
        const notebook = {
            id: Date.now().toString(36),
            name: input,
            notes: [],
        }
        dispatch(addNotebook(notebook));
        setshowform(false)
    }
    return (
        <div className='navPanel-wrapper'>
            <button className='new-note-btn' onClick={newNoteHandler}>New Note</button>

            {/* ---Displaying error message--- */}
            {isError && <p className='error'>Create & select a Notebook!</p>}

            <div className='Addnotebook-wrapper'>
                <label>NOTEBOOKS</label>
                <button onClick={noteBookButtonHandler} className='transparent_icons'><MdLibraryAdd /></button>
            </div>


            {/* ---input field for adding notebook name--- */}
            {showform && <div>
                <input type="text" placeholder='enter notebook name...'
                    onChange={(e) => setinput(e.target.value)} />
                <button
                    onClick={notebookNameInputHandler}
                >Save</button>
            </div>}


            {/* here we will use state to display all the notes */}
            {
                notebooks.map((notebook) => (
                    <div className='notebook-wrapper' key={notebook.id}>
                        <NoteBook notebook={notebook} />
                    </div>
                ))
            }

        </div>
    )
}

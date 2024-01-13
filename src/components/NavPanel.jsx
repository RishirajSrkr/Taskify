import React, { useEffect, useState } from 'react'
import '../CSS/NavPanel.css'
import { useSelector, useDispatch } from 'react-redux'
import { addNoteToNotebook, addNotebook, setFormVisibility, setIsEditing, setSelectedNotebookId, updateNotebookName } from '../redux/notebookSlice';
import NoteBook from './NoteBook';
import { MdLibraryAdd } from "react-icons/md";
import { MdError } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { savetolocalstorage } from '../components/localstorage'

export default function NavPanel() {

    const dispatch = useDispatch();

    //checking error
    const [isError, setIsError] = useState(false)
    const [notebookNameEmpty, setNotebookNameEmpty] = useState(false)

    //showing notebook name input form
    const [showform, setshowform] = useState(false)

    //taking notebook name input
    const [input, setinput] = useState('');

    //fetching state(notebook) from store
    const { notebooks, selectedNotebookId, isEditing } = useSelector((state) => state.notebook);


    const selectedNotebook = notebooks.find(notebook => notebook.id === selectedNotebookId);

    //ADDING A NEW NOTEBOOK---------------
    const noteBookButtonHandler = () => {
        if (isEditing) return;
        dispatch(setSelectedNotebookId(null))
        //show form for user to input the new notebook name.
        setshowform(true);
    }


    //ERROR MESSAGE IF NO NOTEBOOK IS SELECTED-----------
    useEffect(() => {
        //if a notebook is selected than the user can create a note.
        if (selectedNotebookId) setIsError(false);
        if (input !== '') setNotebookNameEmpty(false);

        //if notebook name input is empty, notebook cannot be saved or updated.
    }, [selectedNotebookId, input])


    //ADDING A NEW NOTE----------------
    const newNoteHandler = () => {
        if (isEditing) return;

        //if no notebook is selected or if the notebooks array length is zero than the user cannot create a note.
        if (!selectedNotebookId || notebooks.length === 0) {
            setIsError(true)
        }
        else
            dispatch(setFormVisibility(true));
    }



    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            notebookNameInputHandler();
        }
    }
    //ADDING & UPDATING NOTEBOOK NAME--------------
    const notebookNameInputHandler = () => {

        //cannot save notebook if notebook name is empty
        if (input === '') {
            setNotebookNameEmpty(true)
            return;
        }

        if (selectedNotebookId) {
            dispatch(updateNotebookName({ notebookId: selectedNotebookId, newName: input }));
            dispatch(setIsEditing(false));
        }

        if (!isEditing) {
            const notebook = {
                id: Date.now().toString(36),
                name: input,
                notes: [],
            }
            dispatch(addNotebook(notebook));
        }


        setshowform(false)
        setinput('');
        setNotebookNameEmpty(false)
    }


    useEffect(() => {
        savetolocalstorage(notebooks)
    }, [notebooks])


    //KEEPING TRACK OF SELECTED NOTEBOOK ID, WHEN
    return (
        <div className='navPanel-wrapper'>
            <button className='new-note-btn' onClick={newNoteHandler}>New Note</button>

            {/* ---Displaying error message--- */}

            {isError && <p className='error'> <MdError /> {`${notebooks.length === 0 ? 'Create & Select a Notebook!' : 'Select a Notebook!'}`}</p>}

            <div className='Addnotebook-wrapper'>
                <label>NOTEBOOKS</label>
                <button onClick={noteBookButtonHandler} className='transparent_icons'><MdLibraryAdd /></button>
            </div>


            {/* ---input field for adding notebook name--- */}
            {showform && <div className='notebook-name-input-wrapper'>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <input className='notebook-name-input' type="text" placeholder={`${selectedNotebookId ? 'Updated Name?' : 'Notebook Name?'}`}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setinput(e.target.value)} />
                    <button
                        onClick={notebookNameInputHandler}
                    ><MdOutlineDone /></button>
                </div>

                {/* ---Displaying error message--- */}
                {notebookNameEmpty && <p className='error notebook-name-error'> <MdError /> Notebook name cannot be empty!</p>}
            </div>}


            {/* here we will use state to display all the notes */}
            {
                notebooks?.map((notebook) => (
                    <div className='notebook-wrapper' key={notebook.id}>
                        <NoteBook notebook={notebook} setshowform={setshowform} />
                    </div>
                ))
            }

        </div>
    )
}

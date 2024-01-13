import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { MdOutlineDone } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import { removeNotebook, setIsEditing, setSelectedNotebookId, updateNotebookName } from '../redux/notebookSlice'
import '../CSS/notebook.css'

export default function NoteBook({ notebook, setshowform }) {
    const dispatch = useDispatch();
    const { notebooks, selectedNotebookId, isEditing } = useSelector((state) => state.notebook)

    const handleNotebookClick = () => {

         const selectedNotebook = notebooks.find(notebook => notebook.id === selectedNotebookId)
        console.log(selectedNotebook);
        dispatch(setSelectedNotebookId(notebook.id))
    }

    const handleDelete = () => {
        if(isEditing) return;

        dispatch(removeNotebook(notebook.id))
    }

    const handleEdit = () => {
        dispatch(setIsEditing(true));
        setshowform(true)
    }



    return (
        <div className={`notebook-container ${notebook.id === selectedNotebookId ? 'selected-notebook' : ''}`} onClick={handleNotebookClick}>
            <h3>{notebook.name} </h3>

            <div className='button-wrapper'>

                <button className='transparent_icons' onClick={handleEdit}
                ><MdEdit />
                </button>

                <button className='transparent_icons' onClick={handleDelete}
                ><RiDeleteBin6Line />
                </button>

            </div>
        </div>

    )
}

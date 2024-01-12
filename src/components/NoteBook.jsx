import React from 'react'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedNotebookId } from '../redux/notebookSlice'
import '../CSS/notebook.css'

export default function NoteBook({ notebook }) {

    const dispatch = useDispatch();
    const handleNotebookClick = () => {
        dispatch(setSelectedNotebookId(notebook.id))
    }

    const selectedNotebookId = useSelector((state) => state.notebook.selectedNotebookId)


    return (
        <div className={`notebook-container ${notebook.id === selectedNotebookId ? 'selected-notebook' : ''}`} onClick={handleNotebookClick}>
            <h3>{notebook.name}</h3>
            <div className='button-wrapper'>
                <button className='transparent_icons'><MdEdit /></button>
                <button className='transparent_icons'><RiDeleteBin6Line /></button>
            </div>
        </div>

    )
}

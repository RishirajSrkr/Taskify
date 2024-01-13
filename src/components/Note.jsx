import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from 'react-icons/md'
export default function Note({ title, content,  handleClickDelete, handleClickEdit }) {
  return (
    <div>
      <div><h2 className='title'>{title}</h2></div>
      <div className='content'><p className='content'>{content}</p></div>
      <div className='note-delete-icon-wrapper'>
        <button onClick={handleClickDelete} className='transparent_icons note-delete-icon'><RiDeleteBin6Line /></button>
      </div>

      <div className='note-delete-icon-wrapper edit'>
        <button onClick={handleClickEdit} className='transparent_icons note-delete-icon'><MdEdit /></button>
      </div>
    </div>
  )
}

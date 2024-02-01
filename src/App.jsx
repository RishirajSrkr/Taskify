import { useState } from 'react'
import './App.css'
import NavPanel from './components/NavPanel'
import { IoMdMenu } from "react-icons/io";
import Note from './components/Note'
import AllNotes from './components/AllNotes'

function App() {

     //menu button handler
     const menuBtnHandler = () => {
      const sidebar = document.querySelector('.navPanel-wrapper');
      console.log("Button Clicked");
      sidebar.classList.toggle('show');

   }


  return (
    <div>
      {/* displaying menu button based on screen size */}
      {window.innerWidth < 600 ? <button
        onClick={menuBtnHandler}
        className='menuBtn'><IoMdMenu /></button> : null}

      <NavPanel menuBtnHandler={menuBtnHandler} />
      <AllNotes />
    </div>
  )
}

export default App

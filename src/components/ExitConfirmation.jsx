import React from 'react'

export default function ExitConfirmation({ yesHandler, noHandler }) {
    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"1rem"}}>
            <p>Exit without saving?</p>
            <div style={{display:"flex", gap:"1rem"}}>
                <button className='save-btn' onClick={yesHandler}>Yes</button>
                <button className='cancel-btn-white' onClick={noHandler}>No</button>
            </div>
        </div>
    )
}

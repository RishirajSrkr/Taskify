import React from 'react'
import '../CSS/exitConfirmation.css'

export default function ExitConfirmation({ yesHandler, noHandler }) {
    return (
        <div className='exit-confirmation-wrapper'>
            <p>Exit without saving?</p>
            <div className='exit-confirmation-btn-wrapper'>
                <button className='save-btn' onClick={yesHandler}>Yes</button>
                <button className='cancel-btn' onClick={noHandler}>No</button>
            </div>
        </div>
    )
}

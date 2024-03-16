import React from 'react'
import dotImage from '../../images/dot.png'


function ViewNotes(props) {
    let date = new Date(props.date)
    return (
        <div className='noteDiv'>
            <div className='dateContainer'>
                <p
                    className='dateStyle'>
                    {date.getDate() + " " + date.toLocaleString('en-US', { month: 'short' }) + " " + date.getFullYear()}
                    <img className='dotImg' src={dotImage} />
                    {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
            <div className='note'>
                {props.note}
            </div>
        </div>
    )
}

export default ViewNotes
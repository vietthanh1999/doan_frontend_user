import React, {useContext, useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import "../../css/Conversation.css"

function Conversation({
    src,
    name
}) {

    return (
        <div className='conversation'>
            <img 
                className='conversationImg' 
                src={src ? ("http://127.0.0.1:8000/static" + src) : 'https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=720'} alt=''
                />
            <span className='convesationName'>{name}</span>
        </div>
    )
}

export default Conversation
import React, {useContext, useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import "../../css/Message.css"
import {format} from "timeago.js-vi"

export default function Message(
    {   
        own,
        message,
        src,
        timeAgo
    }) {

    return (
        <div className={own ? "message own" : "message" }>
            <div className='messageTop'>
                <img 
                    className='messageImg' 
                    src={src ? ("http://127.0.0.1:8000/static" + src) :'https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=720'} alt=''/>
                <p className='messageText'>{message}</p>
            </div>
            <div className='messageBottom'>
                {/* {format(timeAgo)} */}
            </div>

        </div>
    )
}

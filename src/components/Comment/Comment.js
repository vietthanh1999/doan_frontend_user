import React from 'react';
import '../../css/Comment.css';
import { MdFavoriteBorder } from "react-icons/md";
import { ImStarFull } from "react-icons/im";

function Comment({
    id,
    img,
    time,
    content,
    user
}) {
    return (
        <div className='comment'>
            <img src={img} alt="" />
            <div className='comment__info'>
                <div className="comment__infoTop">
                    <p><label>{user}</label> {time}</p>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment

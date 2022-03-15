import React from 'react';
import '../../css/Room.css';
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import StarIcon from "@material-ui/icons/Star";
import { MdFavoriteBorder } from "react-icons/md";
import { ImStarFull } from "react-icons/im";
import {Link} from 'react-router-dom'

function Room({
    id,
    img,
    location,
    title,
    description,
    star,
    price,
    total,
}) {
    return (
        <Link to={`/room-detail/${id}`} action="replace" className='room'>
            <img src={img} alt="" />
            <MdFavoriteBorder className="room__heart" />

            <div className='room__info'>
                <div className="room__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>____</p>
                    <p>{description}</p>
                </div>

                <div className="room__infoBottom">
                    <div className="room__stars">
                        <ImStarFull className="room__star" />
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                    <div className='rooms__price'>
                        <h2>{price}</h2>
                        {/* <p>{total}</p> */}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Room

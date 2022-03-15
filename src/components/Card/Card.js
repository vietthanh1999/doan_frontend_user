import React from 'react';
import '../../css/Card.css'
import {Link} from 'react-router-dom'
import { Markup } from 'interweave';

function Card({ id, src, title, description, price }) {
    return (
        <Link to={`room-detail/${id}`} className='card'>
            <img src={src} alt="" />
            <div className="card__info">
                <h2>{title}</h2>
                <div className="synopsis-content"><Markup className="synopsis-content" content={description}/></div>
                <h3>{price}</h3>
            </div>
        </Link>
    )
}

export default Card
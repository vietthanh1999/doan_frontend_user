import React from 'react';
import '../../css/Room.css';
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import StarIcon from "@material-ui/icons/Star";
import { MdFavoriteBorder } from "react-icons/md";
import { ImStarFull } from "react-icons/im";
import {Link} from 'react-router-dom'
import cookie from 'react-cookies';
import API, { endpoints } from '../Config/Api';
import {CalendarOutlined, UserOutlined, HomeOutlined, CheckCircleOutlined, DollarCircleOutlined} from '@ant-design/icons'
import Paypal from './Paypal';

const pStyle = {
    color: 'green',
    fontSize: "1rem"
  };

function RentManageDetail({
    id,
    img,
    location,
    title,
    description,
    star,
    price,
    total,
    user_name,
    status
}) {

    let  token = { 
        headers: {
            "Authorization": `Bearer ${cookie.load("access_token")}`} 
    }

    const deleteRent = () => {
        let res = API.delete(`host/booking-management/${id}`, token).then((response) => {
            console.log(response.data)      
        }).catch((error) => {

        });
    }
    return (
        <div to={`/room-detail/${id}`} action="replace" className='room'>
            <img src={img} alt="" />
            {!status ? <button className='room__button' onClick={() => deleteRent()} >Hủy</button> : <></>}
            {status ? <div className='paypalRight'><Paypal total={total}/></div> : <></>}

            <div className='room__info'>
                <div className="room__infoTop">
                    <p><HomeOutlined/> {location}</p>
                    <h3>{title}</h3>
                    <p><UserOutlined/> {user_name}</p>
                    <p><CalendarOutlined/> {description}</p>
                    <p style={pStyle}><CheckCircleOutlined /> {"Trạng thái: " + (status ? "Đã xác nhận" : "Chưa xác nhận")}</p>
                    <p><DollarCircleOutlined />{"Tổng tiền: " + total}$</p>
                </div>

                <div className="room__infoBottom">
                    {/* <div className="room__stars">

                    </div> */}
                    <div className='rooms__price'>
                        <h2>{price}</h2>
                        {/* <p>{total}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentManageDetail

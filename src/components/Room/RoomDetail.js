import React, {useEffect, useState} from 'react'
import '../../css/RoomDetail.css';
import { ImStarFull } from "react-icons/im";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import API, { endpoints } from '../Config/Api'
import cookie from 'react-cookies'
import CommentList from '../Comment/CommentList'
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import 'antd/dist/antd.css';
import { Image } from 'antd';
import { FaBed, FaUser, FaHouseUser, FaFacebookMessenger } from 'react-icons/fa';
import { MdBedroomParent, MdBathroom } from 'react-icons/md';
import {Link} from 'react-router-dom'

function RoomDetail() {

    const [room, setRoom] = useState({
        address: "",
        price: 0,
        created_by: {
            last_name: "",
            first_name: "",
            avatar: ""
        }
    });
    let { id } = useParams();
    let user_id 
    let navigate = useNavigate();
    if (cookie.load("user"))
        user_id = cookie.load("user").id

    useEffect(() => {
        API.get(`houses/${id}`).then((response)=> {
            console.log(response.data)
            setRoom(response.data)
        }).catch((error) =>{
        })
        console.log(room)
    },[])

    // define check-in and check-out state
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    // define handler change function on check-in date
    const handleCheckInDate = (date) => {
        setCheckInDate(date);
        setCheckOutDate(null);
    };

    // define handler change function on check-out date
    const handleCheckOutDate = (date) => {
        setCheckOutDate(date);
    };

    const handleBookRoom = (event) => {
        event.preventDefault()
        // checkIn = moment(checkInDate).format("DD/MM/YYYY")
        // checkOut =moment(checkOutDate).format("DD/MM/YYYY")
        try {
           let res = API.post(endpoints["rent-manage"], {
              "house_id": id,
              "check_in_date": moment(checkInDate).format("YYYY-MM-DD"),
              "check_out_date": moment(checkOutDate).format("YYYY-MM-DD"),
              "status": false,
              "created_by": user_id,
              "totalPrice": parseInt((checkOutDate-checkInDate)/(24*3600*1000)) * room.price
           })
         } catch(err) {
           console.error(err)
         }
         
         
         navigate("/rented-house")
         console.log( "Đặt phòng thành công")
    }

    return (
        
        <div className='room_detail'>

            <div className='room__info_one'>
                {/* <h3>{"Stay at this spacious Edwardian House"}</h3> */}
                <div className="room__stars">
                        <ImStarFull className="room__star" />
                        <p>
                            <strong>{5}</strong>{ " " + room.address}
                        </p>
                    </div>
            </div>

            <div className='room_image'>
                <div className='item room_image_one'>
                <Image
                        width={610}
                        height={310}
                        src={room && room.image} />
                </div>
                <div className='item '>
                    {/* <img src="https://a0.muscache.com/im/pictures/53aef051-78d4-4bb6-9e06-02f63ebda074.jpg?im_w=720" alt="" /> */}
                    <Image
                        width={300}
                        height={150}
                        src={room && room.image} />
                </div>
                <div className='item '>
                <Image
                        width={300}
                        height={150}
                        src={room && room.image} />
                </div>
                <div className='item '>
                <Image
                        width={300}
                        height={150}
                        src={room && room.image} />
                </div>
                <div className='item '>
                <Image
                        width={300}
                        height={150}
                        src={room && room.image} />
                </div>
            </div>

            <Container  className="container__info">
            <Row>
                <Col xs={8}>
                    <div className="room__infoLeft">
                        <h3>{room && room.name}</h3> <br/>
                        <p>
                            <FaUser/> <span style={{marginRight: '20px'}}>{` ${room.guest} khách `}</span> 
                            <MdBedroomParent/> <span style={{marginRight: '20px'}}>{`${room.bed_room} phòng ngủ `}</span> 
                            <FaBed/> <span style={{marginRight: '20px'}}>{`${room.bed} giường `}</span> 
                            <MdBathroom/> <span style={{marginRight: '20px'}}>{`${room.bath_room} phòng tắm`}</span>
                        </p> <br/>
                        <p>{room.description}</p>

                    </div>

                    <div className="room__infoCenter">
                        <h4>{"Toàn bộ nhà"}</h4>
                        <p>{"Bạn sẽ có căn hộ cho riêng mình."}</p> <br/>

                        <h4>{"Vệ sinh tăng cường"}</h4>
                        <p>{"Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb."}</p>
                        
                    </div>

                    <div className='infoUserHost'>
                        <img src={room && room.created_by.avatar} alt=""/> 
                        <div className='infoUserHost__name'>
                            <h4>{ room && (room.created_by.last_name + " " + room.created_by.first_name)} <Link to="/messenger"><FaFacebookMessenger/></Link></h4>
                            <p><FaHouseUser/> Chủ nhà</p>
                        </div>
                        
                    </div>
                </Col>

                <Col>
                <div className="room__infoRight">
                    <div className='room__infoPrice'>
                        <div className='room__price'>{room.price}</div> $/đêm
                    </div>
                    <div className='room__input-date'>
                        <div>
                            <label className='form-label'>Nhận Phòng</label>
                            <DatePicker
                                selected={checkInDate}
                                minDate={new Date()}
                                onChange={handleCheckInDate}
                            />
                        </div>
                        <div>
                            <label className='form-label'>Trả phòng</label>
                            <DatePicker
                                selected={checkOutDate}
                                minDate={checkInDate}
                                onChange={handleCheckOutDate}
                            />
                        </div>
                    </div>

                    {checkInDate && checkOutDate && (
                        <div className="summary">
                            <p>
                                Bạn đặt phòng từ ngày {moment(checkInDate).format("DD/MM/YYYY")} đến{" "}
                                {moment(checkOutDate).format("DD/MM/YYYY")}.
                            </p>

                            <div className='totalMoney'>Tổng: {(parseInt((checkOutDate-checkInDate)/(24*3600*1000))+1) * room.price}$</div>
                        </div>

                    )}
                    <Button className='submit-btn' onClick={handleBookRoom}>Đặt Phòng</Button>   
                </div>
                </Col>
            </Row>

            </Container>

            <div className='room_comment'>
                <CommentList></CommentList>
            </div>
           
        </div>
    )
}

export default RoomDetail

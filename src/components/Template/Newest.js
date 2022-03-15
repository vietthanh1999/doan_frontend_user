import React, {useContext, useEffect, useRef, useState} from 'react'
// import {useHistory} from 'react-router'
// import {Link} from 'react-router-dom'
// import {LoginContext} from '../../context/LoginContext'
// import Api from '../Config/Api'
// import logo from './image/logo.png'
function Newest() {
    return (
        <div id="fh5co-properties" className="fh5co-section-gray">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 text-center heading-section">
                        <h3>Newest Properties</h3>
                        <p>Trải nghiệm mới trong tuần này dành cho bạn</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="property">
                            <a href="#" className="fh5co-property" style={{backgroundImage : `url(${process.env.PUBLIC_URL + "images/house1.jpg"})`}}>
                                <span className="status">Sale</span>
                                <ul className="list-details">
                                    <li>2 khách</li>
                                    <li>1 phòng ngủ</li>
                                    <li>1 giường</li>
                                    <li>1 phòng tắm riêng</li>
                                </ul>
                            </a>
                            <div className="property-details">
                                <h3>COCONUT HOTEL PHÚ YÊN</h3>
                                <span className="price">$12/ đêm</span>
                                <p>Phòng tại khách sạn. Chủ nhà Coconut Hotel</p>
                                <span className="address"><i className="icon-map"></i>Thành phố Tuy Hòa, Phú Yên, Việt Nam</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="property">
                            <a href="#" className="fh5co-property" style={{backgroundImage : `url(${process.env.PUBLIC_URL + "images/house2.jpg"})`}}>
                                <span className="status">Rent</span>
                                <ul className="list-details">
                                    <li>2 khách</li>
                                    <li>1 phòng ngủ</li>
                                    <li>1 giường</li>
                                    <li>1 phòng tắm riêng</li>
                                </ul>
                            </a>
                            <div className="property-details">
                                <h3>Deluxe room -Rock villa Hoi An</h3>
                                <span className="price">$46/ đêm</span>
                                <p>Phòng tại khách sạn. Chủ nhà Thao</p>
                                <span className="address"><i className="icon-map"></i>tp. Hội An, Quang Nam Province, Việt Nam</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="property">
                            <a href="#" className="fh5co-property" style={{backgroundImage : `url(${process.env.PUBLIC_URL + "images/house3.jpg"})`}}>
                                <span className="status">Sale</span>
                                <ul className="list-details">
                                    <li>4 khách</li>
                                    <li>2 phòng ngủ</li>
                                    <li>3 giường</li>
                                    <li>2 phòng tắm riêng</li>
                                </ul>
                            </a>
                            <div className="property-details">
                                <h3>Live like a Hoianer in traditional home★5' beach</h3>
                                <span className="price">$60/ đêm</span>
                                <p>Phòng riêng tại nhà ở. Chủ nhà Loongboong.</p>
                                <span className="address"><i className="icon-map"></i>Thành phố Hội An, Quảng Nam, Việt Nam</span>						
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="property">
                            <a href="#" className="fh5co-property" style={{backgroundImage : `url(${process.env.PUBLIC_URL + "images/house1.jpg"})`}}>
                                <span className="status">Sale</span>
                                <ul className="list-details">
                                    <li>4 khách</li>
                                    <li>2 phòng ngủ</li>
                                    <li>3 giường</li>
                                    <li>2 phòng tắm riêng</li>
                                </ul>
                            </a>
                            <div className="property-details">
                                <h3>Properties at Alaska</h3>
                                <span className="price">$3,000</span>
                                <p>Phòng tại khách sạn. Chủ nhà Coconut Hotel</p>
                                <span className="address"><i className="icon-map"></i>Thomas Street, St. Louis, MO 8990, USA</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="property">
                            <a href="#" className="fh5co-property" style={{backgroundImage : `url(${process.env.PUBLIC_URL + "images/house2.jpg"})`}}>
                                <span className="status">Rent</span>
                                <ul className="list-details">
                                    <li>3 khách</li>
                                    <li>2 phòng ngủ</li>
                                    <li>3 giường</li>
                                    <li>2 phòng tắm riêng</li>
                                </ul>
                            </a>
                            <div className="property-details">
                                <h3>Modern Properties</h3>
                                <span className="price">$200/mos</span>
                                <p>Phòng tại khách sạn. Chủ nhà Coconut Hotel</p>
                                <span className="address"><i className="icon-map"></i>Thomas Street, St. Louis, MO 8990, USA</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="property">
                            <a href="#" className="fh5co-property" style={{backgroundImage : `url(${process.env.PUBLIC_URL + "images/house3.jpg"})`}}>
                                <span className="status">Sale</span>
                                <ul className="list-details">
                                    <li>4 khách</li>
                                    <li>2 phòng ngủ</li>
                                    <li>3 giường</li>
                                    <li>2 phòng tắm riêng</li>
                                </ul>
                            </a>
                            <div className="property-details">
                                <h3>House at the Top of Mountain</h3>
                                <span className="price">$3,000</span>
                                <p>Phòng tại khách sạn. Chủ nhà Coconut Hotel</p>
                                <span className="address"><i className="icon-map"></i>Thomas Street, St. Louis, MO 8990, USA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newest
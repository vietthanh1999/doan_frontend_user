import React, {useContext, useEffect, useRef, useState} from 'react'
import API from '../Config/Api'
import {Link} from 'react-router-dom'

function Rooms() {

    const [listRoom, setListRoom] = useState([]);

    useEffect(() => {
            API.get('houses/').then((response)=> {
				console.log(response.data.results)
				console.log(typeof (response.data.results))
                setListRoom(response.data.results);
            }).catch((error) =>{
            })
			console.log(listRoom)
    },[])
    return (
        <div>
            <div className="hero-wrap" style={{backgroundImage : `url(${process.env.PUBLIC_URL + "images/bg_1.jpg"})`}}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text d-flex align-itemd-end justify-content-center">
                    <div className="col-md-9 ftco-animate text-center d-flex align-items-end justify-content-center">
                        <div className="text">
                            <p className="breadcrumbs mb-2"><span className="mr-2"><a href="index.html">Home</a></span> <span>About</span></p>
                            <h1 className="mb-4 bread">Rooms</h1>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <section className="ftco-section bg-light">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-9">
                                <div className="row">
                                    {listRoom.map((house) => (
                                        <div className="col-sm col-md-6 col-lg-4 ftco-animate fadeInUp ftco-animated" key={house}>
                                            <div className="room">
                                                <a href="rooms-single.html" className="img d-flex justify-content-center align-items-center" style={{backgroundImage : `url(${house.image})`}}>
                                                    <div className="icon d-flex justify-content-center align-items-center">
                                                        <span className="icon-search2"></span>
                                                    </div>
                                                </a>
                                                <div className="text p-3 text-center">
                                                    <h3 className="mb-3"><a href="rooms-single.html">{house.name}</a></h3>
                                                    <p><span className="price mr-2">${house.price}</span> <span className="per">/ đêm</span></p>
                                                    <ul className="list">
                                                        <li><span>Max:</span> 3 Người</li>
                                                        <li><span>Size:</span> 45 m2</li>
                                                        <li><span>View:</span> Sea View</li>
                                                        <li><span>Bed:</span> 1</li>
                                                    </ul>
                                                    <hr/>
                                                    <p className="pt-1"><Link to={`/room-detail/${house.id}`} className="btn-custom">Book Now <span className="icon-long-arrow-right"></span></Link></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-3 sidebar">
                            <div className="sidebar-wrap bg-light ftco-animate fadeInUp ftco-animated">
                                <h3 className="heading mb-4">Advanced Search</h3>
                                <form action="#">
                                    <div className="fields">
                                <div className="form-group">
                                    <input type="text" id="checkin_date" className="form-control checkin_date" placeholder="Check In Date"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" id="checkin_date" className="form-control checkout_date" placeholder="Check Out Date"/>
                                </div>
                                <div className="form-group">
                                    <div className="select-wrap one-third">
                                    <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                    <select name="" id="" className="form-control">
                                        <option value="">Room Type</option>
                                        <option value="">Suite</option>
                                    <option value="">Family Room</option>
                                    <option value="">Deluxe Room</option>
                                    <option value="">Classic Room</option>
                                    <option value="">Superior Room</option>
                                    <option value="">Luxury Room</option>
                                    </select>
                                </div>
                                </div>
                                <div className="form-group">
                                    <div className="select-wrap one-third">
                                    <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                    <select name="" id="" className="form-control">
                                        <option value="">0 Adult</option>
                                        <option value="">1 Adult</option>
                                    <option value="">2 Adult</option>
                                    <option value="">3 Adult</option>
                                    <option value="">4 Adult</option>
                                    <option value="">5 Adult</option>
                                    <option value="">6 Adult</option>
                                    </select>
                                </div>
                                </div>
                                <div className="form-group">
                                    <div className="select-wrap one-third">
                                    <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                    <select name="" id="" className="form-control">
                                        <option value="">0 Children</option>
                                        <option value="">1 Children</option>
                                    <option value="">2 Children</option>
                                    <option value="">3 Children</option>
                                    <option value="">4 Children</option>
                                    <option value="">5 Children</option>
                                    <option value="">6 Children</option>
                                    </select>
                                </div>
                                </div>
                                <div className="form-group">
                                    <div className="range-slider">
                                        <span>
                                                        <input type="number" value="25000" min="0" max="120000"/>	-
                                                        <input type="number" value="50000" min="0" max="120000"/>
                                                    </span>
                                                    <input value="1000" min="0" max="120000" step="500" type="range"/>
                                                    <input value="50000" min="0" max="120000" step="500" type="range"/>
                                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Search" className="btn btn-primary py-3 px-5"/>
                                </div>
                                </div>
                            </form>
                            </div>
                            <div className="sidebar-wrap bg-light ftco-animate fadeInUp ftco-animated">
                                <h3 className="heading mb-4">Star Rating</h3>
                                <form method="post" className="star-rating">
                                        <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                                <label className="form-check-label" for="exampleCheck1">
                                                    <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i></span></p>
                                                </label>
                                        </div>
                                        <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i></span></p>
                                        </label>
                                        </div>
                                        <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i></span></p>
                                        </label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i></span></p>
                                        </label>
                                        </div>
                                        <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i></span></p>
                                            </label>
                                        </div>
                                    </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
        </div>
    )
}

export default Rooms
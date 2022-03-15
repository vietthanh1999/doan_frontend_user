import React, {useContext, useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'

function Menu() {

    return (
        <div className='menu'>
            <ul id="nav-left">
                <li className='menu__nav'><Link to="/rental-house-manager">Quản lý đặt nhà/phòng</Link></li>
                <li className='menu__nav'><Link to="/booking-manager">Quản lý đặt nhà/phòng</Link></li>
                <li className='menu__nav'><Link to="/messenger">Hộp thư đến</Link></li>
                <li className='menu__nav'><Link to="/income-statistics">Thông tin phân tích</Link></li>
                <li className='menu__nav menu-nav-user'>
                    {/* <Link to="/list-room"><FaUserCircle /></Link>
                    <ul className="subnav">
                        {r}
                    </ul> */}
                </li>
            </ul>
        </div>
    )
}

export default Menu
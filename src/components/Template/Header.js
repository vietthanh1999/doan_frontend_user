import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {useHistory} from 'react-router'
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { logoutUser } from "../../ActionCreators/UserCreators";
import "../../css/Header.css";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { HOST_LEVEL, RENTER_LEVEl } from "../Constants/Constants";

function Header() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    cookie.remove("access_token");
    cookie.remove("user");
    dispatch(logoutUser());
    navigate("/login");
  };
  console.log(user);

  let r = (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Đăng nhập
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Đăng ký
        </Link>
      </li>
    </>
  );
  if (user !== null && user !== undefined && user.level === HOST_LEVEL)
    r = (
      <>
        <li className="nav-item">
          <Link to="/messenger" className="nav-link">
            Tin nhắn
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/notification" className="nav-link">
            Thông báo
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/account" className="nav-link">
            Tài khoản
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/rental-house-manager" className="nav-link">
            Quản lý nhà cho thuê
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/rented-house" className="nav-link">
            Chuyến đi của bạn
          </Link>
        </li>
        <li className="nav-item">
          <Link onClick={logout} to="/" className="nav-link">
            Đăng xuất
          </Link>
        </li>
      </>
    );

  if (user !== null && user !== undefined && user.level === RENTER_LEVEl)
    r = (
      <>
        <li className="nav-item">
          <Link to="/messenger" className="nav-link">
            Tin nhắn
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/notification" className="nav-link">
            Thông báo
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/account" className="nav-link">
            Tài khoản
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/rented-house" className="nav-link">
            Chuyến đi của bạn
          </Link>
        </li>
        <li className="nav-item">
          <Link onClick={logout} to="/" className="nav-link">
            Đăng xuất
          </Link>
        </li>
      </>
    );

  return (
    <div className="header">
      <Link to="/" className="navbar-brand">
        {/* <img
                    className="header__icon"
                    src="https://iweb.tatthanh.com.vn/pic/3/blog/images/image(2068).png"
                    alt=""
                /> */}
        HOMIE
      </Link>

      <div className="header__center">
        <input type="text" placeholder="Bắt đầu tìm kiếm" />
        <FiSearch />
      </div>

      <div className="header__right">
        <ul id="nav-right">
          <li className="nav">
            <Link to="/become-a-host">Trở thành chủ nhà</Link>
          </li>
          <li className="nav">
            <Link to="/list-room">Danh sách phòng</Link>
          </li>
          <li className="nav">
            <Link to="/list-room">
              <FiMenu />
            </Link>
          </li>
          <li className="nav nav-user">
            <Link to="/list-room">
              <FaUserCircle />
            </Link>
            <ul className="subnav">{r}</ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;

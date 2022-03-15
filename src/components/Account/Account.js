import React, {useState, useEffect} from 'react';
import '../../css/Account.css'
import { Button } from "@material-ui/core";
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { BiCheck, BiStar } from "react-icons/bi";
import API, { endpoints } from '../Config/Api';
import cookie from 'react-cookies';
import { set } from 'date-fns';


function Account() {
    const [hide, setHide] = useState({
        info: false,
        pass: false
    })
    const [userCurrentInfo, setUserCurrentInfo] = useState({})
    const [password, setPassword] = useState({
        old_password: "",
        new_password: "",
        new_again_password: ""
    })
    const [avatar, setAvatar] = useState(undefined)
    const [files, setFiles] = useState([])
    let form, formPasswork

    let  token = { 
        headers: {
            "Authorization": `Bearer ${cookie.load("access_token")}`} 
    }

    useEffect(() => {
        API.get('users/current-user/', {
            headers: {
              "Authorization": `Bearer ${cookie.load("access_token")}`
            }
          }).then((response)=> {
            console.log(response.data)
            setUserCurrentInfo(response.data)
        }).catch((error) =>{
        })
    },[avatar])

    const displayForm = () => {
        setHide({...hide, info: !hide.info})
    }

    const displayFormPasswork = () => {
        setHide({...hide, pass: !hide.pass})
    }

    const selectFile = (event) => {
        try {
            let formData = new FormData()

            formData.append("avatar", event.target.files[0])
            formData.append("first_name", userCurrentInfo.first_name)
            formData.append("last_name", userCurrentInfo.last_name)
            formData.append("username", userCurrentInfo.username)

            let res = API.put(`user/update`, formData, token).then((response) => {
                console.log(response.data)
                setAvatar(event.target.files[0])
            }).catch((error) => {
    
            });
        } catch(err) {
            console.error(err)
        }
    };

    const updateInfo = (e) => {
        try {
            let formData = new FormData()

            formData.append("first_name", userCurrentInfo.first_name)
            formData.append("last_name", userCurrentInfo.last_name)
            formData.append("username", userCurrentInfo.username)

            let res = API.put(`user/update`, formData, token).then((response) => {
                console.log(response.data)
            }).catch((error) => {
    
            });
        } catch(err) {
            console.error(err)
        }
    }

    const updatePass = (e) => {

        if (password.new_password != password.new_again_password) {
            
        }
        try {
            let formData = new FormData()

            formData.append("old_password", password.old_password)
            formData.append("new_password", password.new_password)

            let res = API.put(`user/change-password`, formData, token).then((response) => {
                console.log(response.data)
            }).catch((error) => {
    
            });
        } catch(err) {
            console.error(err)
        }
    }

    if (hide.info)
        form = <>
            <form className="form__account">
                <div className='row__inputAccount info_three'>
                    <p>Họ</p>
                    <input type="text" 
                        onChange={e => setUserCurrentInfo({...userCurrentInfo, last_name: e.target.value})} 
                        value={userCurrentInfo.last_name}/>
                </div>
                <div className='row__inputAccount info_three'>
                    <p>Tên</p>
                    <input type="text" onChange={e => setUserCurrentInfo({...userCurrentInfo, first_name: e.target.value})} value={userCurrentInfo.first_name}/>
                </div>
                <div className='row__inputAccount info_four'>
                    <p>Số điện thoại</p>
                    <input type="text"></input>
                </div>
                <div className='row__btn'>
                    <button className='btnCancelForm'>Hủy</button>
                    <button className='btnSaveForm' onClick={updateInfo}>Lưu</button>
                </div>
                
            </form>
        </>
        
    if (hide.pass)
        formPasswork = <>
            <form className="form__account">
                <div className='row__inputAccount info_three'>
                    <p>Mật khẩu cũ</p>
                    <input type="password" onChange={e => setPassword({...password, old_password: e.target.value})} value={password.old_password}></input>
                </div>
                <div className='row__inputAccount info_three'>
                    <p>Mật khẩu mới</p>
                    <input type="password" onChange={e => setPassword({...password, new_password: e.target.value})} value={password.new_password}></input>
                </div>
                <div className='row__inputAccount info_four'>
                    <p>Nhập lại mật khẩu</p>
                    <input type="password" onChange={e => setPassword({...password, new_again_password: e.target.value})} value={password.new_again_password}></input>
                </div>
                <div className='row__inputAccount info_four'>
                    <button className='btnCancelForm'>Hủy</button>
                    <button className='btnSaveForm' onClick={updatePass}>Lưu</button>
                </div>
            </form>
        </>

    return (
        <Container className='info_account'>
            <Row>
                <Col xs={3} className='info__left'>
                    <div className='info info_one'>
                        {/* <img src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"></img> */}
                        <img src={`http://127.0.0.1:8000/static${userCurrentInfo.avatar}`}></img>
                        <label className="custom-file-upload">
                            <input className="inputAvatar" type="file" multiple onChange={selectFile} />
                            <i className="fa fa-cloud-upload" /> Cập nhật ảnh đại diện
                        </label>

                        {/* <input type="file" multiple className="input__file" onChange={selectFile} /> */}
                    </div>
                    <div className='info info__two'>
                        <label>Xác minh danh tính</label>
                        <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính.</p>
                        <button>Nhận huy hiệu</button>
                    </div>
                    <div className='info info__three'>
                        <label>Đã xác nhận</label>
                        <p> <BiCheck/> Địa chỉ email</p>
                        <p> <BiCheck/> Số điện thoại</p>
                    </div>
                </Col>
                <Col className='info info__right'>
                    <h2>Xin chào, Tôi là Thành</h2>
                    <div className='info_user'>
                        
                        <div className='info__name'>
                            <button className="btnUnderlined" onClick={displayForm}>Chỉnh sửa hồ sơ</button>
                            {form}
                        </div>

                        <div className='info__name'>
                            <button className="btnUnderlined" onClick={displayFormPasswork}>Đổi mật khẩu</button>
                            {formPasswork}
                    </div>
                    </div>

                    
                    <div className='showComment'>
                        <div> <BiStar/> 0 Đánh giá</div>
                        <button className='btnUnderlined'>Đánh giá của bạn</button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Account
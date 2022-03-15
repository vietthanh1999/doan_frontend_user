import ReactDOM from "react-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import API, { endpoints } from "../Config/Api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginUser from "../../ActionCreators/UserCreators";
import cookie from "react-cookies";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../css/Login.css'

export default function Login() {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLogged, setLogged] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      let res = await API.post(endpoints["auth-login"], {
        username: values.username,
        password: values.password,
      });
      cookie.save("access_token", res.data.access);

      let user = await API.get(endpoints["current-user"], {
        headers: {
          Authorization: `Bearer ${cookie.load("access_token")}`,
        },
      });
      cookie.save("user", JSON.stringify(user.data));
      dispatch(loginUser(user.data));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className='login-form' style={{width: '30%', marginLeft: '30%', marginTop: '6%'}}>
        <h3 style={{textAlign: 'center', color: "#ff385c"}}>HOMIE</h3>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>

            <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
}

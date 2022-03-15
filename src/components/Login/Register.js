import ReactDOM from "react-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import API, { endpoints } from "../Config/Api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginUser from "../../ActionCreators/UserCreators";
import cookie from "react-cookies";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} bắt buộc!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Register() {
  const [user, setUser] = useState({});
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLogged, setLogged] = useState(false);
  const [imgAvatar, setImgAvatar] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      var formData = new FormData();
      console.log(values);
      console.log(imgAvatar);
      formData.append("username", values.user.username);
      formData.append("password", values.password);
      formData.append("first_name", values.user.firstname);
      formData.append("last_name", values.user.lastname);
      formData.append("email", values.user.email);
      formData.append("avatar", imgAvatar);
      let res = await API.post("users/", formData).then((response) => {
        console.log(response.data.access);
        navigate("/login");
      });
    } catch (err) {
      console.error(err);
    }
  };

  const selectFile = (event) => {
    setImgAvatar(event.target.files[0]);
  };

  return (
    <div style={{ width: "30%", marginLeft: "30%", marginTop: "6%" }}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        style={{
          marginTop: "100px",
        }}
      >
        <Form.Item
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 6 }}
          name={["user", "first_name"]}
          label="Tên"
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 6 }}
          name={["user", "last_name"]}
          label="Họ"
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 6 }}
          name={["user", "username"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 6 }}
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 6 }}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <input
          type="file"
          name="avatar"
          style={{ marginLeft: "34%", marginBottom: "20px" }}
          onChange={selectFile}
        />

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;

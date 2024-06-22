import React, { useState } from "react";
import { Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../../../utils/AxiosConfig";

function Signup() {
  const [buttonLoading, setButtonLoading] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  const [password, setPassword] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const handleSignUpButton = () => {
    setButtonLoading(true);

    axiosRequest
      .post(`/user/signup`, {
        email,
        password,
        username
      })
      .then((res) => {
        setButtonLoading(false);
        navigate("/login");
      })
      .catch((e) => {
        showtoast("error", "Server Error!");
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const showtoast = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
      style: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "20%",
        }}
      >
        <div>
          <img src="../assets/logo.png" height={80}></img>
        </div>
        <h1 style={{ textAlign: "center" }}>Note App</h1>
        <span>Welcome back!</span>
        <br></br>

        <div style={{ width: "100%" }}>
          <label>Email:</label>
          <Input
            placeholder="Email"
            prefix={<MailOutlined />}
            style={{ background: "transparent", }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <br></br>
        <div style={{ width: "100%" }}>
          <label>Username:</label>
          <Input
            placeholder="Username"
            prefix={<UserOutlined />}
            style={{ background: "transparent", }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <br></br>
        <div style={{ width: "100%" }}>
          <label>Password:</label>
          <Input.Password
            placeholder="password"
            prefix={<LockOutlined />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <br></br>
        
        <div style={{ width: "100%" }}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            loading={buttonLoading}
            onClick={handleSignUpButton}
          >
            Signup
          </Button>
        </div>

        <br></br>
        <div>
          <span style={{ color: "grey" }}>
            Already have an account?{" "}
            <span
              style={{ color: "var(--primary-color)", cursor: "pointer" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </span>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}

export default Signup;
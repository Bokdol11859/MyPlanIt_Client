import { useState } from "react";
import "./login.components.css";
import { Button } from "@nextui-org/react";
import { Input, Switch } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQyNDQ5MDUyLCJpYXQiOjE2NDIzNjI2NTIsImp0aSI6ImZmNWVkMzQzNTJkNzQxZDI5YTk3ZTg0ZTFjNTkwNmUwIiwidXNlcl9pZCI6Mzd9.LhzBMGI7ibYwUqPtmbvANRLsMBL_abdxruDNwQhY2D0'
  const apiUrl = 'https://myplanit.link/login'
  
  function attemptLogin() {
    axios
      .post(
        "https://myplanit.link/login",
        {
          email: email,
          password: password,
        },
        {

          withCredentials: true,
          
          headers: {
            "Content-Type": "application/json",
          
          },
          
          
        }
        
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.jwt_token.access_token);
        console.log(response.data.jwt_token.refresh_token);
        localStorage.setItem("accessToken", response.data.jwt_token.access_token);
        localStorage.setItem("refreshToken", response.data.jwt_token.refresh_token);
        navigate("/main");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("존재하지 않는 이메일입니다");
        } else if (error.response.status === 401) {
          alert("비밀번호가 틀렸습니다");
        } else {
          alert("오류");
        }
      });
  }

  return (
    <div className="container">
      <img
        className="Logo"
        src="/images/logo.png"
        style={{ marginTop: "200px", width: "173px", marginBottom: "101px" }}
      />
      <Input
        className="email-input"
        size="large"
        placeholder="이메일 입력"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        style={{ width: "327px", marginBottom: "12px", fontFamily: "PretendardRegular",fontSize: "16px", color:"#CECECE"}}
      />  <Input.Password
        className="password-input"
        size="large"
        placeholder="비밀번호 입력"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        style={{ width: "327px", marginBottom: "19px", fontFamily: "PretendardRegular",fontSize: "16px", color:"#CECECE"}}
      />
      <span className="switch">
        <Switch />
        <p
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            marginLeft: "10px",
            color: "#C4C4C4",
            fontSize: "14.5px",
          }}
        >
          자동 로그인
        </p>
      </span>
      <button
        onClick={() => {
          console.log(email, password);
          attemptLogin();
        }}
        className="login-button"
      >
        로그인
      </button>
      <span
        className="button-group"
        style={{ marginTop: "8px", fontSize: "12px" }}
      >
        <p style={{ marginLeft: "12px", marginRight: "12px", opacity: 0.3 , fontFamily: "PretendardRegular",fontSize: "12px", color:"#929292"}}>
          아직 계정이 없으신가요?
        </p>
        <p>
          <Link style={{ color: "black" , fontFamily: "PretendardRegular",fontSize: "12px", color:"#000000"}} to="/signup1">
            회원가입하기
          </Link>
        </p>
      </span>
   
    </div>
  );
}

export default Login;

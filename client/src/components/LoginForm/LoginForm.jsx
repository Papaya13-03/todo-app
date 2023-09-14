import React, { useEffect, useState } from "react";
import { getToken, saveToken } from "../../Logic/token";
import { Link } from "react-router-dom";
import "../../App.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    const token = getToken();
    if(token) {
      window.location.href = "/";
    }
  },[])

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const account = { username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    };
    await fetch(process.env.REACT_APP_SERVER_URI + "/login", options)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.message === "Valid user!") {
          saveToken(data.token);
          alert("Login success!");
          window.location.href = "/";
        } else {
          alert("Wrong username or password!");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setUsername("");
    setPassword("");
  };

  return (
    <div className="wrap">
      <h1>Login</h1>
      <form onSubmit={(e) => submitHandle(e)} className="auth_form">
        <input
          type="username"
          onChange={(e) => usernameChange(e)}
          name="username"
          value={username}
          placeholder="Enter your username"
        />
        <input
          type="password"
          onChange={(e) => passwordChange(e)}
          name="password"
          value={password}
          placeholder="Enter your password"
        />
        <input type="submit" value="Login" />
      </form>
      <p style={{ "margin-top": "15px" }}>
        Don't have an account?<Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;

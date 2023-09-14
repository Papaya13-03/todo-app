import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../Logic/token";

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
    await fetch(process.env.REACT_APP_SERVER_URI + "/register", options)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.message === "created a new user!") {
          alert("Register successfully!");
          window.location.href = "/login";
        } else alert("Username existed!");
      })
      .catch((err) => {
        console.log(err);
      });

    setUsername("");
    setPassword("");
  };

  return (
    <div className="wrap">
      <h1>Register</h1>
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
        <input type="submit" value="Register" />
      </form>
      <p style={{ "margin-top": "15px" }}>
        Already have an account?<Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default LoginForm;

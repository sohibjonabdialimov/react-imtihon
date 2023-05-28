import React, { useContext, useRef } from "react";
import "./style.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { tokenActions } from "../../store/token/token.slice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLoginHandle = (e) => {
    e.preventDefault();
    if (emailRef.current.value && passwordRef.current.value) {
      axios
        .post("https://invoices-8ehs.onrender.com/login", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("id", res.data.user.id)
            dispatch(tokenActions.setToken(res.data));
            navigate("/add");
          }
        }).catch(err => alert("Email or password error. Try again!"))
    }else{
      alert("Please, you must be fill email and password fields!")
    }
  };
  return (
    <div className="login">
      <div className="login__content">
        <h2>Login</h2>
        <form onSubmit={(e) => onLoginHandle(e)}>
          <div className="input__wrap">
            <label htmlFor="email">Email</label>
            <input ref={emailRef} type="email" />
          </div>
          <div className="input__wrap">
            <label htmlFor="email">Password</label>
            <input ref={passwordRef} type="password" />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

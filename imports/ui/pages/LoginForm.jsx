import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import RegisterForm from "./RegisterForm";
import Modal from "../components/Modal";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [modal, setModal] = useState(false);
  const [response, setResponse] = useState();

  const user = useTracker(() => Meteor.userId());

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        setResponse(err.reason);
        // alert(err.reason);
      } else {
        setResponse("successfully Logged In")
        // alert("successfully Logged In");
      }
    });
  };

  const closeModal = () => {
    setResponse(null);
  }


  return (
    <>
    {response && <Modal response={response} onClose={closeModal} onConfirm={closeModal} />}
    {user && !response && <Navigate to="/Home" replace={true} />}
      <div className="container">
        <form onSubmit={submit} className="login-form">
          <div>
            <label className="input-width" htmlFor="username">
              Username
            </label>
            <input
              className="input-width"
              type="text"
              placeholder="Username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="input-width" htmlFor="password">
              Password
            </label>
            <input
              className="input-width"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="togglePassword"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show Password</span>
          </div>
          <button type="submit">Log In</button>
          <p>Don't have an account?</p>
          <Link className="register-btn" to="/Register">
            Register
          </Link>
        </form>
      </div>
    </>
  );
}

export default LoginForm;

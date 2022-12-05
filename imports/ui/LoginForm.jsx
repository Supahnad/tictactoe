import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  return (
    <div className="container">
      <form onSubmit={submit} className="login-form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            <Link className="login-btn" to="/TicTacToe">Log In</Link>
          </button>
        </div>
        <p>Don't have an account?</p>
        <Link className="register-btn" to="/Register">
          Register
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;

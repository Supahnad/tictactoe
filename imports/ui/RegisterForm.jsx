import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Accounts.createUser({
      username: username,
      password: password,
      email: email,
      profile: {
        firstName: Fname,
        lastName: Lname,
      },
    });

    setUsername("");
    setPassword("");
    setEmail("");
    setFname("");
    setLname("");
  };

  return (
    <div className="container">
      <form onSubmit={submit} className="register-form">
        <div>
          <label htmlFor="Fname">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="Fname"
            value={Fname}
            required
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Lname">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="Lname"
            value={Lname}
            required
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="EmailAddress">Email Address</label>
          <input
            type="text"
            placeholder="Email Address"
            name="EmailAddress"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
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
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </div>
        <p>Already have an account?</p>
        <Link to="/">Log In</Link>
      </form>
    </div>
  );
}

export default RegisterForm;

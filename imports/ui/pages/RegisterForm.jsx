import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Modal from "../components/Modal";

function RegisterForm() {
  let navigate = useNavigate();
  const [response, setResponse] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.call("create.User", username,password,email,Fname,Lname)
    setResponse("successfully registered")
  };
  const closeModal = () => {
    setResponse(null);
    navigate("/");
  }

  return (
    <>
    {response && <Modal response={response} onClose={closeModal} onConfirm={closeModal} />}
    <div className="container">
      <form onSubmit={submit} className="register-form">
        <div>
          <label htmlFor="Fname">First Name<span>&#42;</span></label>
          <input
            type="text"
            placeholder="First Name"
            name="Fname"
            required
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Lname">Last Name<span>&#42;</span></label>
          <input
            type="text"
            placeholder="Last Name"
            name="Lname"
            required
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="EmailAddress">Email Address<span>&#42;</span></label>
          <input
            type="text"
            placeholder="Email Address"
            name="EmailAddress"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username<span>&#42;</span></label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password<span>&#42;</span></label>

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </div>
        <p>Already have an account?</p>
        <Link to="/">Log In</Link>
      </form>
    </div>
    </>
  );
}

export default RegisterForm;

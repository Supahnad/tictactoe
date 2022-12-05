import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import TicTacToePage from "./TictactoePage.jsx";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/TicTacToe" element={<TicTacToePage />} />
        <Route path="/LogIn" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
};

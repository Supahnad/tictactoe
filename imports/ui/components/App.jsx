import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import HomePage from "../pages/HomePage.jsx";
import TicTacToePage from "../pages/TictactoePage.jsx";
import LoginForm from "../pages/LoginForm.jsx";
import RegisterForm from "../pages/RegisterForm.jsx";
import RoomPage from "../pages/RoomPage.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/RoomLists" element={<RoomPage />} />
        <Route path="/TicTacToe/:roomId" element={<TicTacToePage />} />
        <Route path="/Register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
};

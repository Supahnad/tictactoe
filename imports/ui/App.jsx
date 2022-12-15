import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import HomePage from "./HomePage.jsx";
import TicTacToePage from "./TictactoePage.jsx";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import RoomPage from "./RoomPage.jsx";

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

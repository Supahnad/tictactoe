import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Link, Navigate, useParams } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { RoomsCollection } from "../db/RoomsCollection";
import LoginForm from "./LoginForm.jsx";
import Board from "./board.jsx";
import Squares from "./squares.jsx";

function TicTacToePage() {
  const user = useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();

  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState();
  const [xscore, setxScore] = useState(0);
  const [oscore, setoScore] = useState(0);
  const [draw, setDraw] = useState(false);

  const player = Meteor.userId();
  let { roomId } = useParams();


  const checkForPlayer = () => {
    Meteor.subscribe("roomData", player);
    const player1 = RoomsCollection.find({ _id: roomId }).fetch();
    console.log("player 1 is ", player1);
  };

  useEffect(() => {
    checkForPlayer();
  }, []);

  const checkForWinner = (square, index) => {
    let patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const boxFull = squares.every((square) => {
      if (square !== null) {
        return square;
      }
    });

    for (let i = 0; i < patterns.length; i++) {
      const [a, b, c] = patterns[i];

      if (
        square[a] &&
        square[a] === square[b] &&
        square[b] === square[c] &&
        !boxFull
      ) {
        setWinner(square[a]);
        if (square[a] === "x") {
          setxScore(xscore + 1);
        } else if (square[a] === "o") {
          setoScore(oscore + 1);
        }
      }

      if (boxFull === true) {
        if (square[a] && square[a] === square[b] && square[b] === square[c]) {
          setWinner(square[a]);
          if (square[a] === "x") {
            setxScore(xscore + 1);
          } else if (square[a] === "o") {
            setoScore(oscore + 1);
          }
        }
        if (square[a] !== square[b] && square[a] !== square[c] && !winner) {
          setDraw(true);
        }
      }
    }
  };

  const ClickHandler = (index) => {
    const newSquares = squares;
    if (turn === "x") {
      //checks if the index has a value
      if (newSquares[index] !== null) {
        console.log("box has a value");
      } else {
        newSquares[index] = "x";
        console.log("Player X Clicked");
        setSquares([...newSquares]);
        setTurn("o");
      }
    }
    if (turn === "o") {
      //checks if the index has a value
      if (newSquares[index] !== null) {
        console.log("box has a value");
      } else {
        newSquares[index] = "o";
        console.log("Player O Clicked");
        setSquares([...newSquares]);
        setTurn("x");
      }
    }
    checkForWinner(squares);
  };

  const restartHandler = () => {
    setWinner(null);
    setSquares(new Array(9).fill(null));
    setTurn("x");
    setDraw(false);
  };

  return (
    <>
      <MainNavigation />
      <h3>this is the room {roomId}</h3>
      {!user && <Navigate to="/" replace={true} />}
      <div className="game-container">
        <h1>Let's Play TicTacToe</h1>
        <h2>player {turn}'s turn</h2>
        <div className="Scoreboard">
          <span>X: {xscore}</span>
          <span>O: {oscore}</span>
        </div>
        {/* created a new array of Squares Component
         using the map() and the created array earlier ---> const [squares, setSquares] = useState(new Array(9).fill(null));*/}
        {/* the x and o props determines if the square is x or o */}
        <Board>
          {squares.map((square, index) => (
            <Squares
              key={index}
              x={square === "x" ? 1 : 0}
              o={square === "o" ? 1 : 0}
              onClick={() => ClickHandler(index)}
            />
          ))}
          {winner && (
            <div className="round-over">
              <h5>Player {winner} Won the Game</h5>
              <button
                className="restart-button"
                onClick={() => restartHandler()}
              >
                Play Again
              </button>
            </div>
          )}
          {draw && !winner && (
            <div className="round-over">
              <h5>It's a Draw</h5>
              <button
                className="restart-button"
                onClick={() => restartHandler()}
              >
                Play Again
              </button>
            </div>
          )}
        </Board>
      </div>
    </>
  );
}

export default TicTacToePage;

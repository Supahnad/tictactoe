import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { RoomsCollection } from "../db/RoomsCollection";
import LoginForm from "./LoginForm.jsx";
import Board from "./board.jsx";
import Squares from "./squares.jsx";

function TicTacToePage() {
  let { roomId } = useParams();
  const user = useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();
  let navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  const { roomData } = useTracker(() => {
    Meteor.subscribe("rooms.getRoom", roomId);
    const roomData = RoomsCollection.findOne({ _id: roomId });
    return { roomData };
  });

  // const [squares, setSquares] = useState([]);
  const [turn, setTurn] = useState();
  const [winner, setWinner] = useState();
  const [xscore, setxScore] = useState(0);
  const [oscore, setoScore] = useState(0);
  const [draw, setDraw] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [Player2, setPlayer2] = useState(null);


  useEffect(() => {
    if (roomData) {
      if (isWaiting) {
        checkForPlayer();
        setxScore(roomData.xScore);
        setoScore(roomData.oScore);
      } else {
        checkForWinner(roomData.squares);
      }
    }
  }, [roomData]);

  const checkForPlayer = () => {
    if (roomData.player2Id !== null) {
      // console.log("Ready to Play ");
      setPlayer2(roomData.player2Id);
      setIsWaiting(false);
    } else {
      // console.log("waiting for Opponent ");
      setIsWaiting(true);
    }
  };

  const checkForWinner = (squares, index) => {
    console.log("check")
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
    let status = '';
    for (let i = 0; i < patterns.length; i++) {
      const [a, b, c] = patterns[i];

      if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[b] === squares[c] &&
        !boxFull
      ) {
        // setWinner(squares[a]);
        if (squares[a] === "x") {
          status = 'p1';
          // Meteor.call("set.Score", roomId);
          // console.log("player 1 wins");
          return true;
        } else if (squares[a] === "o") {
          status = 'p2';
          // console.log("player 2 wins");
          // setoScore(oscore + 1);
        }
      }
      // setxScore(roomData.xScore);
      // setoScore(roomData.oScore);

      // if (boxFull === true) {
      //   if (square[a] && square[a] === square[b] && square[b] === square[c]) {
      //     setWinner(square[a]);
      //     if (square[a] === "x") {
      //       // setxScore(xscore + 1);
      //     } else if (square[a] === "o") {
      //       // setoScore(oscore + 1);
      //     }
      //   }
      //   if (square[a] !== square[b] && square[a] !== square[c] && !winner) {
      //     setDraw(true);
      //   }
      // }
    }
    if (status === 'p1') {
      console.log("p1 wins!");
    } else if (status === 'p2') {
      console.log("p2 wins!");
    } else if (status === 'draw') {
      console.log("draw");
    }
    setIsChecking(false);
    // console.log("checking after setting to false ", isChecking);
    return false;
  };

  const ClickHandler = (index) => {

    setIsChecking(true);

    Meteor.call("place.move", roomId, index, roomData.squares, (err, res) => {
      if (res.status === "success") {
        // console.log("response ",res.response)
      } else {
        alert(res.message);
      }
    });
  };

  const restartHandler = () => {
    Meteor.call("reset.Game", roomId);
    setWinner(null);
    setTurn("x");
    setDraw(false);
  };

  const playerLeaveHandler = () => {
    if (roomData.player2Id === user) {
      Meteor.call("player2Leave", roomId);
    }
    navigate(`/Home`);
  };

  return (
    <>
      <MainNavigation />
      {!user && <Navigate to="/" replace={true} />}
      <div className="leave-btn">
        {Player2 === user ? (
          <button onClick={playerLeaveHandler}>Leave Room</button>
        ) : (
          <button onClick={() => navigate(`/Home`)}>Go back</button>
        )}
      </div>
      {isWaiting ? (
        <h1>Waiting for opponent</h1>
      ) : (
        <div className="game-container">
          <h1>Let's Play TicTacToe</h1>
          <h2>
            player{" "}
            {roomData.turn === roomData.player1Id
              ? roomData.player1Username
              : roomData.player2Username}
            's turn
          </h2>
          <div className="Scoreboard">
            <span>
              {roomData.player1Username}: {xscore}
            </span>
            <span>
              {roomData.player2Username}: {oscore}
            </span>
          </div>
          {/* created a new array of Squares Component
         using the map() and the created array earlier ---> const [squares, setSquares] = useState(new Array(9).fill(null));*/}
          {/* the x and o props determines if the square is x or o */}
          <Board>
            {roomData.squares.map((square, index) => (
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
      )}
    </>
  );
}

export default TicTacToePage;

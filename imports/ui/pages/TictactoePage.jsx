import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { RoomsCollection } from "../../db/RoomsCollection";
import LoginForm from "./LoginForm.jsx";
import Board from "../components/board.jsx";
import Squares from "../components/squares.jsx";
import Modal from "../components/Modal";

function TicTacToePage() {
  let { roomId } = useParams();
  const user = useTracker(() => Meteor.userId());
  let navigate = useNavigate();

  const { roomData } = useTracker(() => {
    Meteor.subscribe("rooms.getRoom", roomId);
    const roomData = RoomsCollection.findOne({ _id: roomId });
    return { roomData };
  });

  const [playerWinner, setPlayerWinner] = useState();
  const [isWinner, setIsWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [xscore, setxScore] = useState(0);
  const [oscore, setoScore] = useState(0);
  const [isClicked, setIsClicked] = useState();
  const [isWaiting, setIsWaiting] = useState(true);
  const [Player2, setPlayer2] = useState(null);
  const [tempScore, setTempScore] = useState(0);
  const [response, setResponse] = useState();

  useEffect(() => {
    if (roomData) {
      checkForPlayer();
      checkForWinner(roomData.squares);
      setxScore(roomData.xScore);
      setoScore(roomData.oScore);
      setIsWinner(roomData.winner);
      setIsDraw(roomData.draw);
      if (isWinner === false && isDraw === false) {
        setIsClicked(false);
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
      Meteor.call("reset.RoomData", roomId);
      setIsWaiting(true);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    Meteor.logout();
    setResponse(null);
  };

  const closeModal = () => {
    setResponse(null);
  };

  const openModal = () => {
    setResponse("Are you sure you want to log out?");
  }

  const checkForWinner = (squares, index) => {
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
    let status = "";
    // console.log("status ->", status);
    for (let i = 0; i < patterns.length; i++) {
      const [a, b, c] = patterns[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] === "x") {
          status = "p1";
          setPlayerWinner(roomData.player1Username);
        } else if (squares[a] === "o") {
          status = "p2";
          setPlayerWinner(roomData.player2Username);
        }
      } else if (boxFull === true) {
        if (
          squares[a] !== squares[b] &&
          squares[a] !== squares[c] &&
          !isWinner
        ) {
          status = "draw";
        }
      }
    }
    if (status === "p1") {
      setTempScore(xscore + 1);
      Meteor.call("set.Score", roomId, tempScore, playerWinner);
      console.log("p1 wins!");
    } else if (status === "p2") {
      setTempScore(oscore + 1);
      Meteor.call("set.Score", roomId, tempScore, playerWinner);
      console.log("p2 wins!");
    } else if (status === "draw") {
      Meteor.call("game.Draw", roomId);
      console.log("draw");
    }
  };

  const ClickHandler = (index) => {
    Meteor.call("place.move", roomId, index, roomData.squares, (err, res) => {
      if (res.status === "success") {
        // console.log("response ",res.response)
      } else {
        setResponse(res.message)
        // alert(res.message);
      }
    });
  };

  const restartHandler = () => {
    Meteor.call("reset.Game", roomId, (err, res) => {
      if (res.status === "error") {
        console.log("message: ", res.message);
        console.log("response: ", res.response);
      }
      setIsClicked(true);
    });
  };

  const playerLeaveHandler = () => {
    if (roomData.player2Id === user) {
      Meteor.call("player2Leave", roomId);
    }
    navigate(`/Home`);
  };

  return (
    <>
      <MainNavigation onConfirm={openModal} />
      {response && <Modal response={response} onClose={closeModal} onConfirm={logout} />}
      {!user && !response && <Navigate to="/" replace={true} />}
      <div className="leave-btn">
        {Player2 === user ? (
          <button onClick={playerLeaveHandler}>Leave Room</button>
        ) : (
          <button onClick={() => navigate(`/Home`)}>Go back</button>
        )}
      </div>
      {isWaiting ? (
        <>
          <h1 className="Waiting">Waiting for your opponent</h1>
          <div className="loader"></div>
        </>
      ) : (
        <div className="game-container">
          <div className="game-wrapper">
            <h1 className="shadow">Let's Play TicTacToe</h1>
            <div className="Scoreboard">
              <span>
                {roomData.player1Username}(<span className="x">X</span>):{" "}
                {xscore}
              </span>
              <span>
                {roomData.player2Username}(<span className="o">O</span>):{" "}
                {oscore}
              </span>
            </div>
            <h2 className="shadow">
              player{" "}
              {roomData.turn === roomData.player1Id
                ? roomData.player1Username
                : roomData.player2Username}
              's turn
            </h2>
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
              {isWinner && (
                <div className="round-over">
                  <h5>{playerWinner} Won the Game</h5>
                  <button
                    className="restart-button"
                    onClick={() => restartHandler()}
                    disabled={isClicked}
                  >
                    {isClicked ? (
                      <span>waiting for the opponent...</span>
                    ) : (
                      <span>Play Again</span>
                    )}
                  </button>
                </div>
              )}
              {isDraw && !isWinner && (
                <div className="round-over">
                  <h5>It's a Draw</h5>
                  <button
                    className="restart-button"
                    onClick={() => restartHandler()}
                    disabled={isClicked}
                  >
                    {isClicked ? (
                      <span>waiting for the opponent...</span>
                    ) : (
                      <span>Play Again</span>
                    )}
                  </button>
                </div>
              )}
            </Board>
          </div>
        </div>
      )}
    </>
  );
}

export default TicTacToePage;

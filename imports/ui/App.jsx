import React, { useState, useEffect } from "react";
import Board from "./board.jsx";
import Squares from "./squares.jsx";

export const App = () => {
  //creates an array of squares
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState();
  const [xscore, setxScore] = useState(0);
  const [oscore, setoScore] = useState(0);
  const [draw, setDraw] = useState(false);
  const [restart, setRestart] = useState(false);
  const [match, setMatch] = useState();
  const [boxfull, setBoxFull] = useState();

  useEffect(() => {
    checkForWinner(squares);
    // CheckIfTie();
  }, [match]);

  // useEffect(() => {
  //   checkForWinner(squares);
  //   // CheckIfTie();
  // }, [restart]);

  const checkForWinner = (square) => {
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
      // console.log([patterns[i]]);
      // console.log(a);
      // console.log(b);
      // console.log(c);
      // console.log("START Patterns --------");
      // console.log("Index: " + a + ": " + square[a]);
      // console.log("Index: " + b + ": " + square[b]);
      // console.log("Index: " + c + ": " + square[c]);
      // console.log("END Patterns");
      // console.log("match is " + match);

      // console.log("boxfull is " + boxFull);

      // if (square[a] && square[a] === square[b] && square[b] === square[c]) {
      //   setMatch(true);
      //   setRestart(false);
      //   // setWinner(square[a]);
        
      //   // console.log("test" + match);
      // }
      if(boxFull === true){ 
        if(square[a] && square[a] === square[b] && square[b] === square[c]){
          setMatch(true);
          console.log("match " + match);
        }else if(square[a] && square[a] !== square[b] && square[a] !== square[c]){
          setMatch(false);
          console.log("match on draw " + match);
          console.log(match)
        }
        if(match === false){
          console.log("testdraw" );
        }
      } 
      // if (
      //   boxFull &&
      //   square[a] !== square[b] &&
      //   square[b] !== square[c] &&
      //   square[a] !== square[c]
      // ) {
      //   //  setBoxFull(true)
      //   console.log("box is full");
      // }

      else if (boxFull === true) {
        if (match === true) {
          console.log("Win ");
          //win
        } else if (match === false) {
          //draw
          console.log("draw");
          
        }
      }
      // console.log(match);

      // if (boxFull && match === false) {
      //   setRestart(true);
      //   console.log("restart is " + restart);
      // }

      if (match) {
        // console.log("box not full with pattern win");
        // setWinner(square[a]);
      } //else if (match && boxFull) {
      //   setWinner(square[a]);
      //   console.log("box full with pattern");
      // }
      // if (restart === true) {
      //   setDraw(true);
      //   // setRestart(true);
      //   console.log("gello");
      // }
    }
  };

  // const CheckIfTie = () => {
  //   if (!squares.includes(null)) {
  //     // console.log("its " + restart);
  //     if (restart === true) {
  //       console.log("is it good");
  //       // setDraw(true);
  //     }
  //   }
  // };

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
        // console.log(newSquares);
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
        // console.log(newSquares);
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
    <div>
      <h1>Let's Play TicTacToe</h1>
      <h2>player {turn}'s turn</h2>
      <div className="Scoreboard">
        <span>X: {xscore}</span>
        <span>O: {oscore}</span>
      </div>
      {/* created a new array of Squares Component 
         using the map() and the created array earlier ---> const [squares, setSquares] = useState(new Array(9).fill(null));*/}
      {/* the x and o props determines if the square is x or o */}
      <>
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
              <button onClick={() => restartHandler()}>Play Again</button>
            </div>
          )}
          {draw && (
            <div className="round-over">
              <h5>It's a Draw</h5>
              <button onClick={() => restartHandler()}>Play Again</button>
            </div>
          )}
        </Board>
      </>
    </div>
  );
};

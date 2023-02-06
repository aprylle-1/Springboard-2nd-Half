import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows, ncols, chanceLightStartsOn) {
    let initialBoard = [];
    for (let y = 0; y < nrows ; y ++){
        let currRow = []
        for (let x = 0 ; x < ncols ; x++) currRow.push(Math.random() < chanceLightStartsOn);
        initialBoard.push(currRow)
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(item=>item === false));
  }

  function flipCellsAround(coord) {

    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                boardCopy[y][x] = !boardCopy[y][x];
              }

      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = oldBoard.map(rows => [...rows])
      // TODO: in the copy, flip this cell and the cells around it

      //Get cell above
      const coord_above = y > 0 ? [y - 1, x] : 0;

      //Get cell below
      const coord_below = y < nrows - 1 ? [y + 1, x] : 0;
      
      //Get cell to the right
      const coord_right = x < ncols - 1 ? [y, x + 1] : 0;

      //Get cell to the left
      const coord_left = x > 0 ? [y, x - 1] : 0
      // TODO: return the copy
      const surround_coords = [coord_above, coord_below, coord_left, coord_right]

      flipCell(y, x, boardCopy)
      surround_coords.forEach(coord => {
        if (coord !== 0){
            const [y,x] = coord;
            flipCell(y, x, boardCopy)
        }
      })
      return boardCopy
    });
  }

  function newGame() {
    setBoard(createBoard(nrows, ncols, 0.5))
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
    if (hasWon()){
    return (
        <div>
            <h1>You won!</h1>
            <table className="Board-disabled">
                <tbody>
                    {board.map((row, y)=> {
                        return <tr>{row.map((light, x)=>{
                            return <Cell flipCellsAroundMe={flipCellsAround} isLit={light} coord={`${y}-${x}`}/>
                        })}</tr>
                    })}
                </tbody>
            </table>
            <button onClick={newGame}>New Game</button>
        </div>
    )
    }
    return (
    <>
    <h1>Click on Cell to switch the lights</h1>
    <table className="Board">
        <tbody>
        {board.map((row, y)=> {
            return <tr>{row.map((light, x)=>{
                return <Cell flipCellsAroundMe={flipCellsAround} isLit={light} coord={`${y}-${x}`}/>
            })}</tr>
        })}
        </tbody>
    </table>
    <button onClick={newGame}>New Game</button>
    </>
    )
}

export default Board;

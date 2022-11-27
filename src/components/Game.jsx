import React,{useState} from 'react'
import { calculateWinner } from '../helper'
import Board from './Board'
import './Game.css'

const Game = ({score,players,isXFirst}) => {
  const [board,setBoard] = useState(Array(9).fill(''))
  const [xIsNext,setXIsNext] = useState(isXFirst)
  const [winPlayer,setWinPlayer] = useState({player:''})
  const [isDraw,setIsDraw] = useState(false)
  const winner =calculateWinner(board)

  const handleClick = (index) =>{
    const boardCopy = [...board]
    if(winner || boardCopy[index]){
      return
    } 
    boardCopy[index] = xIsNext ? 'X' : 'O'
    setBoard(boardCopy)
    setXIsNext(!xIsNext)
    let result = calculateWinner(boardCopy)
    if(result!=null){
      if(result === "draw"){
        setIsDraw(true)
      }else{
        score(xIsNext)
        setWinPlayer(xIsNext ? players.firstPlayer : players.secondPlayer)
      }
    }
  }

  return (
    <>
    <div className='bord_game'>
    <div className='player'></div>
    <Board squares={board} click={handleClick}/>
    <p className='game__info'>
      {isDraw ? 'Ничья' :winner ? 'Победитель ' + winPlayer : 'Сейчас ходит ' + (xIsNext ? 'X' : 'O') }
    </p>
    </div>
    </>
  )
}

export default Game
import React,{useState} from 'react'
import { calculateWinner } from '../helper'
import Board from './Board'
import './Game.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Game = () => {
  const [board,setBoard] = useState(Array(9).fill(''))
  const [xIsNext,setXIsNext] = useState(true)
  const [optionGame,setOptionGame] = useState({firstPlayer:'',secondPlayer:'',count:'3'})
  const [inGame,setInGame] = useState(false)
  const winner =calculateWinner(board)

  const handleClick = (index) =>{
    const boardCopy = [...board]
    if(winner || boardCopy[index]) return
    boardCopy[index] = xIsNext ? 'X' : 'O'
    setBoard(boardCopy)
    setXIsNext(!xIsNext)
  }

  const startNewGame = () =>{
    return (
      <button className='game_btn' onClick={()=>setBoard(Array(9).fill(null))}>Начать заново</button>
    )
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    setInGame(true)
    console.log(optionGame)
  }

  if(!inGame){
    return(
      <div className='wrapper'> <Form onSubmit={handleSubmit} className="form_reg">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Первый игрок</Form.Label>
        <Form.Control onChange={e=>setOptionGame({...optionGame,firstPlayer: e.target.value})} type="text" placeholder="Введите имя первого игрока" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Втрой Игрок</Form.Label>
        <Form.Control onChange={e=>setOptionGame({...optionGame,secondPlayer: e.target.value})} type="text" placeholder="Введите имя второго игрока" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Количество сессий</Form.Label>
        <Form.Control onChange={e=>setOptionGame({...optionGame,count:e.target.value})} type="text" placeholder="Максимум 10" />
      </Form.Group>
      <Button  variant="primary" type="submit">
        В бой!
      </Button>
      </Form></div>
    )
  }


  return (
    <>
      
    <div className='wrapper'>
    <div className='bord_game'>{startNewGame()}
    <Board squares={board} click={handleClick}/>
    <p className='game__info'>
      {winner ? 'Победитель ' + winner : 'Сейчас ходит ' + (xIsNext ? 'X' : 'O')}
    </p></div>
    </div>
    
    </>
  )
}

export default Game


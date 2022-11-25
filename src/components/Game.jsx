import React,{useState} from 'react'
import { calculateWinner } from '../helper'
import Board from './Board'
import './Game.css'
import {Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Game = () => {
  const [board,setBoard] = useState(Array(9).fill(''))
  const [xIsNext,setXIsNext] = useState(true)
  const [optionGame,setOptionGame] = useState({firstPlayer:'',secondPlayer:'',BO:''})
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
      <button className='start_btn' onClick={()=>setBoard(Array(9).fill(null))}>Начать заново</button>
    )
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    setInGame(true)
    console.log(optionGame)
  }

  if(!inGame){
    return(
    <div className='wrapper'>
    <Form onSubmit={handleSubmit} className="form_reg">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Первый игрок</Form.Label>
      <Form.Control onChange={e=>setOptionGame({...optionGame,firstPlayer: e.target.value})} type="text" placeholder="Введите имя первого игрока" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Втрой Игрок</Form.Label>
      <Form.Control onChange={e=>setOptionGame({...optionGame,secondPlayer: e.target.value})} type="text" placeholder="Введите имя второго игрока" />
    </Form.Group>
    <Form.Select onChange={e=>setOptionGame({...optionGame,BO: e.target.value})} aria-label="Default select example">
      <option disabled>Выберите Партию</option>
      <option value="BO3">BO3</option>
      <option value="BO5">BO5</option>
      <option value="BO7">BO7</option>
    </Form.Select>
    <Button  variant="primary" type="submit">
      В бой!
    </Button>
    </Form>
    </div>
    )
  }

  return (
    <>
      
    <div className='wrapper'>
    {startNewGame()}
    <Board squares={board} click={handleClick}/>
    <p className='game__info'>
      {winner ? 'Победитель ' + winner : 'Сейчас ходит ' + (xIsNext ? 'X' : 'O')}
    </p>
    </div>
    </>
  )
}

export default Game
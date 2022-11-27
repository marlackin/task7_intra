import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Game from './Game.jsx'
import './Game.css'

const MainPage = () => {
    const [optionGame,setOptionGame] = useState({firstPlayer:'',secondPlayer:'',count:'3'})
    const [inGame,setInGame] = useState(false)
    const [firstPlayerScore,setFirstPlayerScore] = useState(0)
    const [secondPlayerScore,setSecondPlayerScore] = useState(0)


    const handleSubmit = (e) =>{
        e.preventDefault()
        setInGame(true)
        console.log(optionGame)
      }
    
    const updateWinner = (isFirst)=>{
        if(isFirst){
            setFirstPlayerScore(firstPlayerScore+1)
        }
        else{
            setSecondPlayerScore(secondPlayerScore+1)
        }
    }
   if(!inGame){
    return (
        <>
         <div className='wrapper'> <Form onSubmit={handleSubmit} className="form_reg">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Первый игрок</Form.Label>
        <Form.Control onChange={e=>setOptionGame({...optionGame,firstPlayer: e.target.value})} type="text" placeholder="Введите имя первого игрока" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Второй Игрок</Form.Label>
        <Form.Control onChange={e=>setOptionGame({...optionGame,secondPlayer: e.target.value})} type="text" placeholder="Введите имя второго игрока" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Количество сессий</Form.Label>
        <Form.Control onChange={e=>setOptionGame({...optionGame,count:e.target.value})} type="number" placeholder="Введите количество игр" required/>
      </Form.Group>
      <Button  variant="primary" type="submit">
        В бой!
      </Button>
      </Form>
      </div>
          </>
  )
   } else{
    const List = [
        
      ];
    for(let i=0;i<optionGame.count;i++){
       List.push(<Game score={updateWinner} players={optionGame} isXFirst={i%2===0} />)
   }
   return  (
   <div>
   <div className='score'>{optionGame.firstPlayer} {firstPlayerScore} : {secondPlayerScore} {optionGame.secondPlayer}
   <Button variant="danger" onClick={()=>{setInGame(false)}}>Завершить партию</Button>
   </div>
   <div className='wrapper'>{List}</div>
   </div>)
  }
}
      

export default MainPage
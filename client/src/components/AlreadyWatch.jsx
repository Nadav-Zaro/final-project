import axios from 'axios';
import {useState} from 'react';
import style from "../components/myList.module.css"
import {FaCheck, FaGem, FaMinus,} from "react-icons/fa"

export default function AlreadyWatch({userInfo,setUserInfo}) {
  
  function updateGame(update) {
    axios.patch(`/updateGame/${userInfo._id}`,update)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err.response))
  }

  function deleteGame(title) {
    axios.patch(`/deleteGame/${userInfo._id}`,{title:title})
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err.response))
  }
  
  let temp = {...userInfo}

  const element = temp.games.map((it,i)=>{
    if (it.watched) {
      it.time = it.time.substr(0,5)
      return(<div className={style.game} key={i}>
        <div className={style.time}><p>{it.time}</p></div>
        
        <div  className={style.teams}>
          <div className={style.team}>
            <img src={it.teamA[1]} />
            <p>{it.teamA[0]}</p>
          </div>
          <div className={style.team}>
            <img src={it.teamB[1]} />
            <p>{it.teamB[0]}</p>
          </div>
        </div>
        <div className={style.btns}>
          <FaMinus onClick={()=>{
            it.watched = false
            deleteGame(it.title)
            console.log(it.title);
            temp.games.splice(i,1)
            setUserInfo(temp)
          }}/>
          <FaGem onClick={()=>{
            it.watched = false
            it.favorite = true
            updateGame(temp.games)
            temp.games.splice(i,1,it)
            setUserInfo(temp)
          }}/>
        </div>
      </div>)
    }
  })
  return <div className={style.components}>
      <h1>AlreadyWatch</h1>
      {element}
  </div>;
}

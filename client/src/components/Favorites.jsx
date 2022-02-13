import axios from 'axios';
import {useState} from 'react';
import style from "../components/myList.module.css"
import {FaCheck, FaGem, FaMinus,} from "react-icons/fa"

export default function Favorites({userInfo,setUserInfo}) {
  // const [games, setGames] = useState(userInfo.games);
  
  function deleteGame(title) {
    axios.patch(`/deleteGame/${userInfo._id}`,title)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err.response))
    // setGames(temp)
  }
  
  let temp = {...userInfo}

  const element = temp ? temp.games.map((it,i)=>{
    if (it.favorite) {
      it.time = it.time.substr(0,5)
      return(<div  className={style.game} key={i}>
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
            it.favorite = false
            deleteGame({title:it.title})
            temp.games.splice(i,1)
            setUserInfo(temp)
          }}/>
        </div>
      </div>) 
    }
  }) : ""
  return <div className={style.components}>
      <h1>Favorites</h1>
      {element}
  </div>;
}

import {Redirect} from 'react-router-dom';
import GetGames from '../components/GetGames';
import  style from "../components/home.module.css"
import { useEffect } from 'react';
// import moment from 'moment';
import axios from 'axios';
import GetYesterdayGames from '../components/GetYesterdayGames';

export default function Games_to_watch({auth,isRedirectEdit,isRedirectView,games,setGames,setUserInfo,userInfo,setOnline}) {
useEffect(()=>{
  if (auth) {
   return getUser() 
  }
  if (userInfo) {
    return updateData()
  }
}, [userInfo]);
if (!auth) {
  return <Redirect to="/"/>
}
if (isRedirectEdit) {
  return <Redirect to="/EditProfile"/>
}
if (isRedirectView) {
  return <Redirect to="/ViewProfile"/>
}

function getUser() {
  let usersOnline = []
  if (auth) {
    axios.get("/UserDetails")
    .then(res=>{
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].isLogin) {
          console.log(res.data[i]);
          usersOnline.push(res.data[i])
        }
        if (res.data[i].email === auth.email) {
          console.log(res.data[i]);
          let obj = {...res.data[i]}
          obj.isLogin = true
          setUserInfo(obj)
        }
      }
      setOnline(usersOnline)
  })
    .catch(err=>console.log(err.response))
  }
}

function updateData() {
  if (auth) {
     axios.patch(`/updateUser/${auth.email}`,{isLogin:true})
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err.response))
  }
   
}

  return <div className={style.games_to_watch}>
      <div className={style.HomeEnter}>
        <img src="https://wallpapercave.com/wp/wp6389292.jpg" loading='lazy'/>
        <h1>Hey, {userInfo ? userInfo.user : auth.email}</h1>
        <h1>Welcome to Baller's Court</h1>
        <p>All NBA games in one place</p>
      </div>
      <div className={style.gamesHolder}>
        <GetGames auth={auth} games={games} setGames={setGames} setUserInfo={setUserInfo} userInfo={userInfo}/>
        <GetYesterdayGames/>
      </div>
  </div>;
}

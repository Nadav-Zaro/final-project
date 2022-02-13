import {Redirect} from 'react-router-dom';
import  style from "../components/myList.module.css"
import {FaTv,FaCheck, FaGem} from "react-icons/fa"
import AllGames from '../components/AllGames';
import AlreadyWatch from '../components/AlreadyWatch';
import { useState ,useEffect} from 'react';
import Favorites from '../components/Favorites';
import axios from 'axios';
// import React from 'react';

export default function My_List({auth,isRedirectEdit,isRedirectView,setUserInfo,userInfo}) {
  const [isAllGames, setIsAllGames] = useState(true);
  const [isAlreadyWatch, setIsAlreadyWatch] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);

const url = "/UserDetails"
if (!auth) {
  return <Redirect to="/"/>
}
if (isRedirectEdit) {
  return <Redirect to="/EditProfile"/>
}
if (isRedirectView) {
  return <Redirect to="/ViewProfile"/>
}
let userGames = {...userInfo}
  return <div className={style.my_List}>
      <div className={style.HomeEnter}>
        <img src="https://th.bing.com/th/id/R.44422f22359275e792d667a45512e32a?rik=l4LsIrOHxNLDMg&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fd%2f0%2f1438088-vertical-nba-wallpapers-hd-1920x1080.jpg&ehk=CY3k2RgFgvptZcOBw1zkN1foONSyra9v5BXFo5sN11A%3d&risl=&pid=ImgRaw&r=0" />
        <h1>Your Private Live NBA Streaming</h1>
      </div>
      {userGames.games.length ? <div className={style.screens}>
        <div className={style.list}>
          <p onClick={()=>{setIsAllGames(true);setIsAlreadyWatch(false);setIsFavorites(false);}}><FaTv/> All Games</p>
          <p onClick={()=>{setIsAllGames(false);setIsAlreadyWatch(true);setIsFavorites(false);}}><FaCheck/> Already Watch</p>
          <p onClick={()=>{setIsAllGames(false);setIsAlreadyWatch(false);setIsFavorites(true);}}><FaGem/> Favorites</p>
        </div>
        <div className={style.componentsHolder}>
          {isAllGames ? <AllGames setUserInfo={setUserInfo} userInfo={userInfo}/> : ""}
          {isAlreadyWatch ? <AlreadyWatch  setUserInfo={setUserInfo} userInfo={userInfo}/> : ""}
          {isFavorites ? <Favorites  setUserInfo={setUserInfo} userInfo={userInfo}/> : ""}
        </div>
      </div> : <div className={style.emptyList}>
        <h1>Hi, {userInfo.user ? userInfo.user : userInfo.email}</h1>
        <h4>It Appears Your Watching List Empty..</h4>
        <p>Go Back Home To Add Games To Your List !</p>
        </div>}
  </div>;
}

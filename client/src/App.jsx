import { BrowserRouter , Link , Route , Switch ,Redirect} from 'react-router-dom';
import { useState,useEffect } from 'react';
import './App.css';
import Home from './screens/Home';
import Games_to_watch from './screens/GamesToWatch';
import MyList from './screens/MyList';
import Posts from './screens/Posts';
import EditProfile from './screens/EditProfile';
import ViewProfile from './screens/ViewProfile';
import CompleteRegistration from './screens/CompleteRegistration';
import UserDetails from './screens/UserDetails';
import axios from 'axios';
import Standing from './screens/Standing';
import About from './screens/About';
import {GiHamburgerMenu} from "react-icons/gi"
// import axios from 'axios';

function App() {
  const [auth, setAuth] = useState(null);
  const [isUserOption, setIsUserOption] = useState(false);
  const [isRedirectView, setIsRedirectView] = useState(false);
  const [isRedirectEdit, setIsRedirectEdit] = useState(false);
  const [games, setGames] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userdetails, setUserdetails] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [online, setOnline] = useState(null);
  const [isHamburger, setIsHamburger] = useState(true);
  const STORAGE_KEY = "userInfo"

  useEffect(() => {
    keppUserLogIn()
  }, [])

  let user = {...userInfo}
  let linksStyle = {visibility:isHamburger ? "visible" : "hidden"}

  function keppUserLogIn() {
    let authDetails = localStorage.getItem(STORAGE_KEY)
    return authDetails ? setAuth(JSON.parse(authDetails)) : null
  }

  function getUsers(arg) {
    axios.get("/UserDetails")
    .then(res=>arg(res.data))
    .catch(err=>console.log(err.response))
  }

  function userLogOut() {
    axios.patch(`/updateUser/${userInfo.email}`,{isLogin:false})
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err.response))
  }

  
 const searchUsersElement = searchUsers ? searchUsers.filter(value=>{
    if (search == "") return value
    else if (value.user.toLowerCase().includes(search.toLowerCase()) || 
    value.firstName.toLowerCase().includes(search.toLowerCase()) ||
    value.lastName.toLowerCase().includes(search.toLowerCase())) {
    return value
    }
  })
  .map((it,i)=>(
      <Link to="/UserDetails" className='searchUser' key={i} onClick={()=>{setUserdetails(it);
        setIsRedirectView(false);setIsRedirectEdit(false)}}>
      <div className='searchUserImg'>
        <img src={it.photo ? it.photo : "https://th.bing.com/th/id/R.91683ea6f8b347bdf0e56b634fff037e?rik=pvJus%2f3t3XB8TA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fbasketball-player-silhouette%2fbasketball-player-silhouette-19.png&ehk=D7euwPpzNwINK8SLYcRlnPfv5l2OMUpJKNqCgSFwrBs%3d&risl=&pid=ImgRaw&r=0"}/>
      </div>
        <p>{it.user}</p>
    </Link>
  )) : ""

  return (
    <BrowserRouter>
    <div className="App">
   {auth ? <div className='nav'>
     <GiHamburgerMenu className='hamburger' onClick={()=>setIsHamburger(!isHamburger)}/>
      <div className='links' style={linksStyle}>
        <Link onClick={()=>{setIsRedirectView(false);setIsRedirectEdit(false);setIsUserOption(false);setUserdetails(null)
        return <Redirect to="/Home"/>}} to="/Home">Home</Link>
        <Link onClick={()=>{setIsRedirectView(false);setIsRedirectEdit(false);setIsUserOption(false);setUserdetails(null)
        return <Redirect to="/MyList"/>}} to="/MyList">My List</Link>
        <Link onClick={()=>{setIsRedirectView(false);setIsRedirectEdit(false);setIsUserOption(false);setUserdetails(null)
        return <Redirect to="/Posts"/>}} to="/Posts">Posts</Link>
        <Link onClick={()=>{setIsRedirectView(false);setIsRedirectEdit(false);setIsUserOption(false);setUserdetails(null)
        return <Redirect to="/Standing"/>}} to="/Standing">Standing</Link>
        <Link onClick={()=>{setIsRedirectView(false);setIsRedirectEdit(false);setIsUserOption(false);setUserdetails(null)
        return <Redirect to="/About"/>}} to="/About">About</Link>
      </div>
      <div className='search'>
        <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="Search.." />
        <button onClick={()=>getUsers(setSearchUsers)} >Search</button>
        <div style={{display:search ? "block" : "none"}} className='searchCon'>
          {searchUsersElement}
        </div>
      </div>
      <div className='user'>
      <p className='online'>{online ? online.length : ""} Online</p>
        <div className='isLogin'></div>
        <img onClick={()=>setIsUserOption(!isUserOption)} className='optionsBtn' src="https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-down-arrows-those-icons-fill-those-icons-7.png"/>
        <div className='userImgDiv'>
          <img src={user.photo ? user.photo : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"} />
        </div>
        <div className='options' style={{display:isUserOption ? "block" : "none"}}>
          <div onClick={()=>{setIsRedirectView(true);setIsRedirectEdit(false);setIsUserOption(false);setUserdetails(null)}} className='option'>
            <p>View Profile</p>
          </div>
          <div onClick={()=>{setIsRedirectEdit(true);setIsRedirectView(false);setIsUserOption(false);setUserdetails(null)}} className='option'>
            <p>Edit Profile</p>
          </div>
          <div onClick={()=>{
            userLogOut()
            setIsUserOption(null);
            setIsRedirectView(false);
            setIsRedirectEdit(false)
            localStorage.setItem(STORAGE_KEY,null)
            setAuth(null);
            setUserInfo(null)
          }} className='option'>
            <p>Log Out</p>
          </div>
        </div>
      </div>
    </div> : ""}

    <Switch>
      <Route exact path="/" render={()=><Home 
      auth={auth} setAuth={setAuth} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
      <Route exact path="/CompleteRegistration" render={()=><CompleteRegistration 
      auth={auth} setAuth={setAuth} setUserInfo={setUserInfo} userInfo={userInfo}/>}/>
      <Route exact path="/Home" render={()=><Games_to_watch userInfo={userInfo} setOnline={setOnline} 
      auth={auth} setUserInfo={setUserInfo} isRedirectView={isRedirectView} isRedirectEdit={isRedirectEdit} games={games} setGames={setGames}/>}/>
      <Route exact path="/MyList" render={()=><MyList 
      auth={auth} isRedirectView={isRedirectView} isRedirectEdit={isRedirectEdit} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
      <Route exact path="/Posts" render={()=><Posts userInfo={userInfo} userdetails={userdetails} online={online}
      auth={auth} isRedirectView={isRedirectView} isRedirectEdit={isRedirectEdit} setUserdetails={setUserdetails}/>}/>
      <Route exact path="/ViewProfile" render={()=><ViewProfile 
      auth={auth} isRedirectEdit={isRedirectEdit} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
      <Route exact path="/EditProfile" render={()=><EditProfile 
      auth={auth} isRedirectView={isRedirectView} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
      <Route exact path="/UserDetails" render={()=><UserDetails auth={auth} userdetails={userdetails} userInfo={userInfo}
      isRedirectView={isRedirectView} isRedirectEdit={isRedirectEdit} online={online} setUserInfo={setUserInfo}/>}/>
      <Route exact path="/Standing" render={()=><Standing auth={auth} 
      isRedirectView={isRedirectView} isRedirectEdit={isRedirectEdit}/>}/>
      <Route exact path="/About" render={()=><About auth={auth} 
      isRedirectView={isRedirectView} isRedirectEdit={isRedirectEdit}/>}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

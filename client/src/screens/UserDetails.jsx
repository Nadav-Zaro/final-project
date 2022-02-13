import axios from "axios";
import { useState, useEffect } from "react";
import { FaCommentAlt, FaPlus } from "react-icons/fa";
import style from "../components/userDetails.module.css";
import { Redirect } from "react-router-dom/";
import moment from "moment";

export default function UserDetails({
  auth,
  userdetails,
  userInfo,
  isRedirectEdit,
  isRedirectView,
  setUserInfo,
  online,
}) {
  const [message, setMessage] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [user, setUser] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  const [userOnlineIndex, setUserOnlineIndex] = useState(0);

  useEffect(getUser, []);
  let tempUser = {...userInfo}
  function getUser() {
      axios.get(`/UserDetails/${userdetails.id}`)
      .then(res=>setUser(res.data[0]))
      .catch(err=>console.log(err.response))
      if (user) {
        findIndex()
      }
  }

  function findIndex() {
    for (let i = 0; i < userdetails.messages.length; i++) {
      if (userInfo.id === userdetails.messages[i].id) {
        setUserIndex(i)
        return true;
      }
    }
    return false;
  }

  console.log(user);
  console.log(userIndex);

  if (!auth) {
    return <Redirect to="/" />;
  }
  if (isRedirectEdit) {
    return <Redirect to="/EditProfile" />;
  }
  if (isRedirectView) {
    return <Redirect to="/ViewProfile" />;
  }
  function addBaller(id,obj) {
    axios
      .patch(`/addBaller/${id}`, obj)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }

  function isUserOnline(match) {
    for (let i = 0; i < online.length; i++) {
      if (online[i].email === match.email) {
        return true;
      }
    }
    return false;
  }

  function doesBallerExist() {
    for (let i = 0; i < userInfo.ballers.length; i++) {
      if (userdetails.email === userInfo.ballers[i].email) {
        return true;
      }
    }
    return false;
  }
  
  return (
    <div className={style.userDetails}>
      <h1>UserDetails</h1>
      <div className={style.user}>
        <div className={style.userImg}>
          <img
            src={
              userdetails.photo
                ? userdetails.photo
                : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"
            }
          />
          {isUserOnline(userdetails) ? (
            <div className={style.isLogin}></div>
          ) : (
            ""
          )}
        </div>
        <div>
          <p>User: {userdetails.user}</p>
          <p>First Name: {userdetails.firstName}</p>
          <p>Last Name: {userdetails.lastName}</p>
          <p>Team: {userdetails.team}</p>
          <p>Ballers: {userdetails.ballers.length}</p>
          <p>posts: {userdetails.posts}</p>
        </div>
        <div className={style.add}>
          <FaPlus
            onClick={() => {
              if (!doesBallerExist()) {
                addBaller(userInfo._id,userdetails);
                let userTemp = { ...userInfo };
                userdetails.messages = []
                userTemp.messages = []
                userTemp.ballers.push(userdetails);
                setUserInfo(userTemp);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

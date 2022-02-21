import { Redirect } from "react-router-dom";
import style from "../components/viewProfile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaMinus, FaPencilAlt,FaCommentAlt, FaAngleRight } from "react-icons/fa";
import moment from "moment";
import Chat from "../components/Chat";

export default function ViewProfile({
  isRedirectEdit,
  auth,
  userInfo,
  setUserInfo,
}) {
  const [posts, setPosts] = useState(null);
  const [isposts, setisPosts] = useState(true);
  const [isBallers, setIsBallers] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [chat, setChat] = useState(null);
  const [editedPost, setEditedPost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  const [userOnlineIndex, setUserOnlineIndex] = useState(0);
  let usertemp = { ...userInfo };

  useEffect(getPosts, []);
  const editedPostStyle = { display: !isEditPost ? "block" : "none" };

  function getUser(obj) {
      axios.get(`/UserDetails/${obj.id}`)
      .then(res=>setUser(res.data[0]))
      .catch(err=>console.log(err.response))
      if (obj) {
        findIndex(obj)
      }
  }

  function findIndex(user) {
    for (let i = 0; i < user.messages.length; i++) {
      if (userInfo.id === user.messages[i].id) {
        setUserIndex(i)
        return true;
      }
    }
    return false;
  }

  if (!auth) {
    return <Redirect to="/" />;
  }
  if (isRedirectEdit) {
    return <Redirect to="/EditProfile" />;
  }

  function getPosts() {
    axios
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err.response));
  }

  function removeBaller(id, ball) {
    axios
      .patch(`/removeBaller/${id}`, ball)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }

  function updatePost(id,edited) {
    axios
      .patch(`/editPost/${id}`, edited)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }

  function deletePost(id) {
    axios
      .delete(`/deletePost/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }

  function isMessageRead(user) {
    axios
    .patch(`/updateMessage/${user.id}`, user.messages)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response));
  }

  function doesMessageExist(match) {
    for (let i = 0; i < usertemp.messages.length; i++) {
      if (match.id === usertemp.messages[i].userId) {
        setUserOnlineIndex(i)
        return true;
      }
    }
    return false;
  }

  function sendNewMessage(obj) {
    // console.log(obj);
    let singleMessage = {
      userId: usertemp.id,
      user: usertemp.user,
      userImg: usertemp.photo,
      isRead:false,
      messages: [
        {
          user: userInfo.photo,
          time: moment().format("DD/MM/YYYY HH:mm"),
          message: message,
        },
      ],
    };
    axios
      .patch(`/sendMessage/${obj.id}`, singleMessage)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }

  function sendedNewMessage(user) {
    // console.log(user);
    let singleMessage = {
      userId: user.id,
      user: user.user,
      userImg: user.photo,
      isRead:true,
      messages: [
        {
          user: userInfo.photo,
          time: moment().format("DD/MM/YYYY HH:mm"),
          message: message,
        },
      ],
    };
    axios
      .patch(`/sendMessage/${usertemp.id}`, singleMessage)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }

  function updateMessage(user,index) {
    let newMessage = {
      user: userInfo.photo,
      time: moment().format("DD/MM/YYYY HH:mm"),
      message: message,
    };
    console.log(user);
    user.messages[index].messages.push(newMessage)
    console.log(user);
      if (user.id !== userInfo.id) {
        user.messages[index].isRead = false
        setUser(user) 
      }
      else{
        setUserInfo(user) 
      }
      axios
      .patch(`/updateMessage/${user.id}`, user.messages)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }

  let postsLists = [...posts] ;
  const postsElement = postsLists
    ? postsLists.map((it, i) => {
        if (it.email === auth.email) {
          return (
            <div key={i} className={style.post}>
              <div className={style.postImg}>
                <img
                  src={
                    userInfo
                      ? usertemp.photo
                      : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"
                  }
                />
              </div>
              <div className={style.postInfo}>
                <p>{it.user}</p>
                <p>{it.date}</p>
                <p style={editedPostStyle}>{it.post}</p>
                {it.edit ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      it.post = editedPost;
                      it.date =
                        moment().format("DD/MM/YYYY HH:mm") + " " + "Edited";
                      it.edit = false;
                      updatePost(it._id, { post: editedPost });
                      setIsEditPost(!isEditPost);
                    }}
                  >
                    <textarea
                      onChange={(e) => setEditedPost(e.target.value)}
                      placeholder="Fix your post"
                    />
                    <button type="submit">Post</button>
                  </form>
                ) : (
                  ""
                )}
              </div>
              <div className={style.options}>
                <p
                title="Edit"
                  onClick={() => {
                    it.edit = true;
                    setIsEditPost(!isEditPost);
                    console.log(it.edit);
                  }}
                >
                  <FaPencilAlt />
                </p>
                <p
                title="Delete"
                  onClick={() => {
                    deletePost(it._id);
                    postsLists.splice(i, 1);
                    setPosts(postsLists);
                  }}
                >
                  <FaMinus />
                </p>
              </div>
            </div>
          );
        }
      })
    : "No Posts Yet";

  const ballersElement = usertemp.ballers
    ? usertemp.ballers.map((it, i) => (
        <div key={i} className={style.post}>
          <div className={style.postImg}>
            <img
              src={
                it.photo
                  ? it.photo
                  : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"
              }
            />
          </div>
          {user ? "" : <div className={style.postInfo}>
            <p>USER: {it.user}</p>
            <p>JOIN: {it.join}</p>
            <p>POSTS: {it.posts}</p>
            <p>BALLER'S: {it.ballers.length}</p>
          </div>}
          {user ? <form className={style.sendMessage}
            onSubmit={(e) => {
              e.preventDefault();
              if (!doesMessageExist(it)) {
                sendNewMessage(it)
                sendedNewMessage(it)
                setChat(usertemp.messages[userOnlineIndex].messages)
                setUserInfo(usertemp)
                return
              }
              else{
                updateMessage(usertemp,userOnlineIndex)
                updateMessage(user,userIndex)
                setIsMessage(false)
                return
              }
            }}
          >
            <h3>Send Message</h3>
            <textarea onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" onClick={()=>getUser(it)}>SEND</button>
            <FaAngleRight className={style.goBack} onClick={()=>setUser(null)}/>
          </form> : ""}
          <div className={style.options}>
            <p title="Delete"
              onClick={() => {
                removeBaller(usertemp._id, { _id: it._id });
                usertemp.ballers.splice(i, 1);
                setUserInfo(usertemp);
              }}
            >
              <FaMinus />
            </p>
            <p title="Send Message" onClick={()=>getUser(it)}><FaCommentAlt/></p>
          </div>
        </div>
      ))
    : "No Ballers Yet";

  const messagesElemnt = usertemp.messages ? usertemp.messages.map((message,i)=>(
    <div key={i} className={message.isRead ? style.messages : style.messageRead} onClick={()=>{
      message.isRead = true
      setIsChat(true)
      setIsMessage(false)
      setChat(usertemp.messages[i].messages)
      setMessageIndex(i)
      isMessageRead(usertemp)
    }}>
        <img src={message.userImg}/>
        <p>{message.user}</p>
    </div>
  ))  : "No Messages Yet";

 

  return (
    <div className={style.viewProfile}>
      <div className={style.profile}>
        <div className={style.profileImg}>
          <img
            src={
              userInfo
                ? userInfo.photo
                : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"
            }
          />
        </div>
        <p>User: {usertemp.user}</p>
        <p>Name: {usertemp.firstName}</p>
        <p>City: {usertemp.city}</p>
        <p>Team: {usertemp.team}</p>
        {/* <p>Ballers: {usertemp.ballers.length}</p> */}
        <p>posts: {usertemp.posts}</p>
      </div>
      <div className={style.userPosts}>
        <div className={style.navigate}>
          <h1
            className={isposts ? style.click : style.unClick}
            onClick={() => {
              setisPosts(true);
              setIsBallers(false);
              setIsMessage(false)
              setIsChat(false)
            }}
          >
            User Posts
          </h1>
          <h1
            className={isBallers ? style.click : style.unClick}
            onClick={() => {
              setisPosts(false);
              setIsBallers(true);
              setIsMessage(false)
              setIsChat(false)
            }}
          >
            Ballers
          </h1>
          <h1
            className={isMessage ? style.click : style.unClick}
            onClick={() => {
              setisPosts(false);
              setIsBallers(false);
              setIsMessage(true)
              setIsChat(false)
            }}
          >
            Messages
          </h1>
        </div>
        <div className={style.optionsHolder}>
          {isposts ? postsElement : ""}
          {isBallers ? ballersElement : ""}
          {isMessage ? messagesElemnt : ""}
          {isChat ? <Chat setChat={setChat} chat={chat} userInfo={userInfo} usertemp={usertemp} messageIndex={messageIndex}
          setUserInfo={setUserInfo} user={user} setUser={setUser} setUserIndex={setUserIndex} userIndex={userIndex}/> : ""}
        </div>
      </div>
    </div>
  );
}

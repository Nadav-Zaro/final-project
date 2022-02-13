import axios from "axios";
import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import style from "../components/viewProfile.module.css";

export default function Chat({
  chat,
  setChat,
  setUserInfo,
  usertemp,
  userInfo,
  messageIndex,
  setUser,
  user,
  userIndex,
  setUserIndex
}) {
  const [message, setmessage] = useState(null);
  let tempChat = [ ...chat ];

  useEffect(getUser, []);
  
  function getUser() {
      axios.get(`/UserDetails/${userInfo.messages[messageIndex].userId}`)
      .then(res=>setUser(res.data[0]))
      .catch(err=>console.log(err.response))
      if (user) {
        findMessage()
      }
  }

  function findMessage() {
      for (let i = 0; i < user.messages.length; i++) {
          if (user.messages[i].userId === userInfo.id) {
            setUserIndex(i)
          }
      }
  }

  let tempUser = {...user}
  function updateMessage(user,index,set) {
    let newMessage = {
        user: userInfo.photo,
        time: moment().format("DD/MM/YYYY HH:mm"),
        message: message,
      };
      user.messages[index].messages.push(newMessage)
      if (user.id !== userInfo.id) {
          user.messages[index].isRead = false
          set(user) 
        }
        else{
         set(user) 
         tempChat.push(newMessage)
         setChat(tempChat)
         setUserInfo(user)
      }
      axios
      .patch(`/updateMessage/${user.id}`, user.messages)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }
//   console.log(user);
  return (
    <div className={style.chats}>
    <div className={style.chatHolder}>
      {chat
        ? tempChat.map((it, i) => {
            return (
              <div key={i} className={style.chat}>
                  <img src={it.user} />
                <div className={style.chatUser}>
                  <p>{it.message}</p>
                  <p>{it.time}</p>
                </div>
              </div>
            );
          })
        : ""}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // setChat(tempChat)
          updateMessage(usertemp,messageIndex,setUserInfo)
          updateMessage(tempUser,userIndex,setUser)
        }}
      >
        <textarea onChange={(e) => setmessage(e.target.value)}></textarea>
        <button type="submit">SEND</button>
      </form>
    </div> 
  );
}

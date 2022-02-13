import  style from "../components/posts.module.css"
import {useState,useEffect,useRef} from 'react';
import axios from "axios";
import { FaAngleDown, FaAngleUp, FaBasketballBall, FaMinus, FaPencilAlt } from 'react-icons/fa';
import moment from 'moment';

export default function GetPosts({posts,setPosts,userInfo,getPosts,setUserdetails,online}) {
  const [editedPost, setEditedPost] = useState(null);
  const [isEditPost, setIsEditPost] = useState(false);
  const [comment, setComment] = useState(null);
  const [isEditComment, setIsEditComment] = useState(false);
  const [editComment, setEditComment] = useState(false);

  let temp
    if (posts) {
        temp = [...posts]
    }

    const editedCommentStyle = {display:!isEditComment ? "block" : "none"}
    const editedPostStyle = {display:!isEditPost ? "block" : "none"}

    function updatePost(id,edited) {
        axios.patch(`/editPost/${id}`,edited)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err.response))
    }

    function deletePost(id) {
      axios.delete(`/deletePost/${id}`)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err.response))
    }

    function addCommentToData(id,it) {
      let userComment = {
        id: userInfo.id,
        user: userInfo.user,
        email: userInfo.email,
        photo: userInfo.photo,
        comment: comment,
        date: moment().format("DD/MM/YYYY HH:mm"),
        edit:false
      }
      axios.patch(`/addComment/${id}`,userComment)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err.response))
      it.comments.push(userComment)
      setPosts(temp)
      getPosts()
    }
    
    function updateComment(id,obj) {
      axios.patch(`/updateComment/${id}`,obj)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err.response))
    }

    function deleteComment(id,obj) {
      axios.patch(`/deleteComment/${id}`,obj)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err.response))
    }

    function isUserOnline(match) {
      for (let i = 0; i < online.length; i++) {
        if (online[i].id === match.id) {
          return true
        }
      }
    }

    function doesExist(match) {
      for (let i = 0; i < match.length; i++) {
        if (match[i].email === userInfo.email) {
          return true
        }
      }
      return false
    }
    
    const postsElement = temp ? temp.map((it,i)=>{
      isUserOnline(it)
      return (
        <div key={i} className={style.usersPosts}>
        <div className={style.postDetails}>
          <div className={style.postDetailsImg}>
            <img onClick={()=>setUserdetails(it)} src={it.photo ? it.photo : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"} />
            {isUserOnline(it) ? <div className={style.isLogin}></div> : ""}  
          </div>
          <div className={style.postUserDetails}>
            <p>{it.user}</p>
            <p>{it.date}</p>
            <p>{it.team}</p>
          </div>
            {userInfo.email === it.email ? <div className={style.editPost}>
              <FaPencilAlt title="Edit" onClick={()=>{setIsEditPost(true);it.edit = true}}/> 
              <FaMinus title="Delete" onClick={()=>{
                deletePost(it.id);
                temp.splice(i,1)
                setPosts(temp)
                }}/>
              </div> : ""}
        </div>
        <div>
          <h4 style={editedPostStyle}>{it.post}</h4>
          {it.edit ? <form  onSubmit={(e)=>{
            e.preventDefault()
            it.post = editedPost
            it.date = moment().format("DD/MM/YYYY HH:mm") + " " + "Edited"
              updatePost(it.id,{post:editedPost})
              setIsEditPost(false)
            it.edit = false
          }}>
            <textarea onChange={(e)=>setEditedPost(e.target.value)} placeholder="Fix your post"/>
            <button type="submit">Post</button>
          </form> : ""}
          <div className={style.ballOrComment}>
            <FaBasketballBall onClick={()=>{
              if (!doesExist(it.ball)) {
                it.ball.push(userInfo)
                updatePost(it.id,{ball:it.ball})
                setPosts(temp)
              }
            }} style={{cursor:"pointer"}}/> {it.ball.length}
            <button onClick={()=>{it.comment = true;setPosts(temp)}}>Comment</button>
            {it.comments.length ? <FaAngleDown title="Comments" style={{cursor:"pointer"}} onClick={()=>{it.seeComments = true;setPosts(temp)}}/> : ""}
          </div>
          {it.comment ? <form className={style.commentForm} onSubmit={(e)=>{
            e.preventDefault()
            it.comment = false
            it.seeComments = false
            addCommentToData(it.id,it)
          }}>
            <textarea onChange={(e)=>setComment(e.target.value)} placeholder="Leave a Comment.."/>
            <button type="submit">Comment</button>
            <p><FaAngleUp title="Close" style={{cursor:"pointer"}} onClick={()=>{it.comment = false;setPosts(temp)}}/></p>
          </form> : ""}
        </div>  
        <div className={style.commentsHolder}>
        {it.seeComments && it.comments.length ? it.comments.map((com,j)=>{
          return(
          <div key={j} className={style.comments}>
          <div className={style.commentsImg}>
            <img src={com.photo ? com.photo : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"} />           
          </div>
          <div className={style.comment}>
              <h5>{com.user}</h5>
              <h5>{com.date}</h5>
              <p style={editedCommentStyle}>{com.comment}</p>
              {com.edit ? <form onSubmit={(e)=>{
                e.preventDefault()
                com.comment = editComment
                com.edit = false
                updateComment(it.id,it.comments)
                setIsEditComment(false)
                setPosts(temp)
                getPosts()
              }}>
              <textarea onChange={(e)=>setEditComment(e.target.value)} placeholder="Fix your comment"/>
              <button type="submit">Post</button>
              <FaMinus onClick={()=>{
                com.edit = false
                setIsEditComment(false)
              }}/>
              </form> : ""}
          </div>
          <div className={style.options}>
            {com.email === userInfo.email ? <p title="Edit" onClick={()=>{
              com.edit = true;
              setIsEditComment(true)
            }}><FaPencilAlt/></p> : ""}
            {userInfo.email === com.email || userInfo.email === it.email ? <p title="Delete" onClick={()=>{
                deleteComment(it.id,{comment:com.comment})
                it.comments.splice(i,1)
                setPosts(temp)
            }}><FaMinus/></p> : ""}
          </div>
        </div>
        )}): ""}
          {it.comments.length ? <FaAngleUp title="Close" style={{cursor:"pointer"}} onClick={()=>{it.seeComments = false;setPosts(temp)}}/> : ""}
        </div>
      </div>
      )}) : ""
  return <div>
      {postsElement}
  </div>;
}
import {Redirect} from 'react-router-dom';
import  style from "../components/posts.module.css"
import { useState,useRef ,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import GetPosts from '../components/GetPosts';

export default function Posts({auth,isRedirectEdit,isRedirectView,userInfo,userdetails,setUserdetails,online}) {
  const post = useRef(null);
  const [posts, setPosts] = useState(null);

  useEffect(getPosts, []);
  
  let temp
  if (posts) {
    temp = [...posts]
  }
  
  function getPosts() {
    axios.get("/posts")
    .then(res=>setPosts(res.data))
    .catch(err=>console.log(err.response))
  }

  function addPostToData(post) {
    axios.post("/addPost",post)
    .then(res=>{console.log(res.data)})
    .catch(err=>console.log(err.response))
  }

  function addPostToUser(post) {
    axios.patch(`/updateUser/${userInfo.email}`,post)
    .then(res=>{console.log(res.data)})
    .catch(err=>console.log(err.response))
  }

  function addPost() {
    let userPost = {
      id:userInfo.id,
      user: userInfo.user,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      photo: userInfo.photo,
      post: post.current.value,
      date: moment().format("DD/MM/YYYY HH:mm"),
      ball: [],
      ballers: userInfo.ballers,
      posts: userInfo.posts +1,
      comments: [],
      edit:false,
      join:userInfo.join,
      comment:false,
      seeComments:false,
      isLogin:userInfo.isLogin,
      messages:userInfo.messages
    }
    addPostToUser({posts:userPost.posts})
    addPostToData(userPost)
    temp.push(userPost)
    setPosts(temp)
  }

  if (!auth) {
    return <Redirect to="/"/>
  }
  
  if (isRedirectEdit) {
    return <Redirect to="/EditProfile"/>
  }

  if (isRedirectView) {
    return <Redirect to="/ViewProfile"/>
  }
  
  if (userdetails) {
    return <Redirect to="/UserDetails"/>
  }

  return <div className={style.postsHolder}>
    <div className={style.posts}>
      <div className={style.profile}>
        <div className={style.profileImg}>
          <img src={userInfo.photo ? userInfo.photo : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"} />
        </div>
          <p>User: {userInfo.user}</p>
          <p>Name: {userInfo.firstName}</p>
          <p>City: {userInfo.city}</p>
          <p>Team: {userInfo.team}</p>
          <p>ballers: {userInfo.ballers.length}</p>
      </div>
    <div className={style.allPosts}>
    <div className={style.post}>
      <div className={style.postImg}>
          <img src={userInfo.photo ? userInfo.photo : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"} />
      </div>
      <form className={style.postForm} onSubmit={(e)=>{
        e.preventDefault()
        addPost()
        // getPosts()
      }}>
        <textarea ref={post} placeholder="What's on your mind.. "/>
        <button type="submit">Post</button>
      </form>
    </div>
      <h1>Posts</h1>
      <GetPosts posts={posts} setPosts={setPosts} userInfo={userInfo} getPosts={getPosts} setUserdetails={setUserdetails} online={online}/>
    </div>
    </div>
  </div>;
}

import {useRef,useState} from 'react';
import {Redirect} from 'react-router-dom';
import  style from "../components/editProfile.module.css"
import axios from "axios"
import API_KEY from '../logic/Api_Key'

export default function EditProfile({isRedirectView,auth,userInfo,setUserInfo}) {
const user = useRef(null);
const firstName = useRef(null);
const lastName = useRef(null);
const city = useRef(null);
const age = useRef(null);
const team = useRef(null);
const [fileSelect, setFileSelect] = useState(null);
const [fileLink, setFileLink] = useState(null);
const password = useRef(null);
const confirnPassword = useRef(null);
const [isEdit, setIsEdit] = useState(true);

function editUserServer(update) {
  axios.patch(`/updateUser/${userInfo.email}`,update)
  .then(res=>console.log(res.data))
  .catch(err=>console.log(err.response))
}

const fileSelectHandler = event=> {
  setFileSelect(event.target.files[0]);
}

const fileUploadHandler = ()=>{
  const formData = new FormData()
  formData.append("file",fileSelect)
  formData.append("upload_preset","ows8jzzb")

  axios.post("https://api.cloudinary.com/v1_1/ballerscourt/image/upload",formData)
  .then(res=>setFileLink(res.data.url))
}

function setUser() {
  let obj = {
      id:userInfo?.id,
      user:user.current.value,
      email:userInfo?.email,
      firstName:firstName.current.value,
      lastName:lastName.current.value,
      city:city.current.value,
      age:age.current.value,
      team:team.current.value,
      posts:userInfo?.posts,
      ballers:userInfo?.ballers,
      photo:fileLink ? fileLink : userInfo?.photo,
      games:userInfo?.games,
      join: userInfo?.join,
      isLogin:userInfo?.isLogin
  }
  editUserServer(obj)
  setUserInfo(obj)
}

function updatePassword() {
  axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,{
      idToken:auth.idToken,
      password: password.current.value
  })
  .then(res=>{console.log(res.data)})
  .catch(err=>console.log(err.response))
  }

if (!userInfo) {
  return <Redirect to="/"/>
}
if (isRedirectView) {
return <Redirect to="/ViewProfile"/>
}
  return <div className={style.editProfile}>
    <img src="https://wallpapercave.com/wp/wp6389430.jpg"/>
      <div className={style.container}>
      <div className={style.options}>
          <h2 onClick={()=>setIsEdit(true)}>Edit Profile</h2>
          <h2 onClick={()=>setIsEdit(false)}>Change Password</h2>
      </div>
      {isEdit ? <form className={style.form} onSubmit={(e)=>{
          e.preventDefault()
          console.log('working');
            setUser()
          }}>
        <label>User</label><br/>    
        <input ref={user} type="text" defaultValue={userInfo?.user}/><br/>
        <label>First Name</label><br/>
        <input ref={firstName} type="text" defaultValue={userInfo?.firstName}/><br/>
        <label>Last Name</label><br/>
        <input ref={lastName} type="text" defaultValue={userInfo?.lastName}/><br/>
        <label>City</label><br/>
        <input ref={city} type="text" defaultValue={userInfo?.city}/><br/>
        <label>Age</label><br/>
        <input ref={age} type="number" defaultValue={userInfo?.age}/><br/>
        <label>Team</label><br/>
        <input ref={team} type="text" defaultValue={userInfo?.team}/><br/>
        <label>Photo</label><br/>
        <input type="file" onChange={fileSelectHandler}/>
        <input onClick={fileUploadHandler} defaultValue="Upload"/><br/>
        <button type="submit">Submit</button>
      </form> :
      <form className={style.form} onSubmit={(e)=>{
          e.preventDefault()
          updatePassword()
          }}>
        <label>User</label><br/>    
        <input ref={user} type="text" defaultValue={userInfo?.user}/><br/>
        <label>Password</label><br/>
        <input ref={password} type="password"/><br/>
        <label>Confirm Password</label><br/>
        <input ref={confirnPassword} type="password" /><br/>
        <button type="submit">Submit</button>
      </form>}
      </div>
  </div>;
}

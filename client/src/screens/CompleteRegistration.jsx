import {useRef,useState} from 'react';
import {Redirect} from 'react-router-dom';
import  style from "../components/completeRegistration.module.css";
import axios from "axios"
import moment from 'moment';


export default function CompleteRegistration({auth,userInfo,setUserInfo,setAuth}) {
    const user = useRef(null);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const city = useRef(null);
    const age = useRef(null);
    const team = useRef(null);
    const [fileSelect, setFileSelect] = useState(null);
    const [fileLink, setFileLink] = useState(null);
    const [isDisable, setIsDisable] = useState(false)
    const STORAGE_KEY2 = "userFullInfo"
    const url = "/UserDetails"
    
    if (userInfo) {
        localStorage.setItem(STORAGE_KEY2,JSON.stringify(userInfo))
        return <Redirect to="/Home"/>
    }

    let allUsers = []

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

    const isValid = ()=>{
        return user.current.value 
    }

    function setUser() {
        if (fileLink) {
            let obj = {
                id:auth.localId,
                user:user.current.value,
                email:auth.email,
                firstName:firstName.current.value,
                lastName:lastName.current.value,
                city:city.current.value,
                age:age.current.value,
                team:team.current.value,
                games:[],
                join: moment().format("DD/MM/YYYY HH:mm"),
                ballers:[],
                posts:[],
                photo:fileLink,
                isLogin:true,
                messages:[]
            }
            setUserInfo(obj)
            allUsers.push(obj)
            axios.post(url,obj)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err.response))
        }
    }
    
    
  return <div className={style.completeRegistration}>
      <img src="https://wallpapercave.com/wp/wp6318787.jpg" loading='lazy'/>
      <form onChange={()=>setIsDisable(isValid())} onSubmit={(e)=>{
          e.preventDefault()
          setUser()
        }}>
        <h1>Complete Registration form</h1>
        <label>USER</label><br/>    
        <input ref={user} type="text" placeholder='User'/><br/>
        <label>FIRST NAME</label><br/>
        <input ref={firstName} type="text" placeholder='First name'/><br/>
        <label>LAST NAME</label><br/>
        <input ref={lastName} type="text" placeholder='Last name'/><br/>
        <label>CITY</label><br/>
        <input ref={city} type="text" placeholder='City'/><br/>
        <label>AGE</label><br/>
        <input ref={age} type="number" placeholder='Age'/><br/>
        <label>TEAM</label><br/>
        <input ref={team} type="text" placeholder='Team'/><br/><br/>
        <label>PICTURE</label><br/>
        <input type="file" onChange={fileSelectHandler}/>
        <button type="button" onClick={fileUploadHandler}>upload</button><br/><br/>
        <button type="submit" disabled={!isDisable}>Submit</button>
      </form>
  </div>;
}

import  style from "../components/home_log_reg.module.css"
import {useState} from 'react'
import API_KEY from '../logic/Api_Key'
import useLoginOrRegister from '../hooks/useLoginOrRegister.js' 
import { Redirect } from 'react-router-dom/'

export default function Login({auth,setAuth,isLogin,setIsLogin,userInfo,setIsRedirect}) {
    const [isDisable, setIsDisable] = useState(false)
    const {
        getAxios,
        email,
        password,
        isLoading,
        isError} = useLoginOrRegister(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,setAuth)
        const isValid = ()=>{
            return email.current.value && 
            password.current.value.length >= 6
        }
    return (
        <div className={isLogin ? style.loginOrRegister : style.logOut}>
            <img onClick={()=>setIsLogin(false)} src="https://img.icons8.com/fluency-systems-filled/48/ffffff/multiply.png"/>
            <span style={{fontSize:"2em",fontWeight:"bolder"}}>Login</span>
            <form onChange={()=>setIsDisable(isValid())} 
                onSubmit={(e)=>{
                e.preventDefault()
                if (isValid()) {
                   getAxios() 
                   setIsRedirect(true) 
                }
            }}>
                <label>Email</label><br/>
                <input ref={email} type="email" placeholder='Email'/><br/>
                <label>Password</label><br/>
                <input ref={password} type="password" placeholder='Password'/><br/><br/>
                <button className={isDisable ? style.btn : style.btnDisable} disabled={!isDisable} type="submit">{isLoading ? <div className={style.spinner}></div> : "Login"}</button>
            </form>
            {isError ? <h2 style={{color:"red"}}>{isError}</h2> : ""}
            {isValid() ? "" : <p>Fill details before register.. </p>}
        </div>
    )
}

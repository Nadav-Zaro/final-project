import  style from "../components/home_log_reg.module.css"
import  { useState } from 'react'
import API_KEY from '../logic/Api_Key'
import useLoginOrRegister from '../hooks/useLoginOrRegister.js' 
import { Redirect } from 'react-router-dom';
import CompleteRegistration from "./CompleteRegistration";

export default function Register({auth,setAuth,isRegister,setIsRegister,setUserInfo,userInfo,setIsredirectToCopmlete}) {
    const [isDisable, setIsDisable] = useState(false)
    const STORAGE_KEY2 = "userFullInfo"

    const {
        getAxios,
        email,
        password,
        confirmPassword,
        isLoading,
        isError} = useLoginOrRegister(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,setAuth)

        const isValid = ()=>{
            return email.current.value && 
            password.current.value && 
            confirmPassword.current.value &&
            password.current.value === confirmPassword.current.value
        }

    return (
        <div className={isRegister ? style.loginOrRegister : style.logOut} style={{boxShadow: "0px 0px 8px 5px #23d5ab"}}>
            <img onClick={()=>setIsRegister(false)} src="https://img.icons8.com/fluency-systems-filled/48/ffffff/multiply.png"/>
            <span style={{fontSize:"2em",fontWeight:"bolder"}}>Register</span>
            <form onChange={()=>setIsDisable(isValid())}
                onSubmit={(e)=>{
                e.preventDefault()
                if (isValid()) {
                    getAxios()
                    setUserInfo(null)
                    localStorage.setItem(STORAGE_KEY2,null)
                    setIsredirectToCopmlete(true)
                }
            }}>
                <label>Email</label><br/>
                <input ref={email} type="email" placeholder='Email'/><br/>
                <label>Password</label><br/>
                <input ref={password} type="password" placeholder='Password'/><br/>
                <label>Confirm Password</label><br/>
                <input ref={confirmPassword} type="password" placeholder='ConfirmPassword'/><br/><br/> 
                <button className={isDisable ? style.btn : style.btnDisable} style={{border:isDisable ? "2px inset #23d5ab" : ""}} disabled={!isDisable} type="submit">{isLoading ? <div className={style.spinner}></div> : "Register"}</button>
            </form>
            {isError ? <h2 style={{color:"red"}}>{isError}</h2> : ""}
            {isValid() ? "" : <p>Fill details before register..</p>}
            {/* <CompleteRegistration isredirectToCopmlete={isredirectToCopmlete} setIsredirectToCopmlete={setIsredirectToCopmlete} auth={auth} setAuth={setAuth} setUserInfo={setUserInfo} userInfo={userInfo}/> */}
        </div>
    )
}

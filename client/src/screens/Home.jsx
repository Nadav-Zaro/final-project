import { useState } from 'react'
import Register from './Register'
import Login from './Login'
import  style from "../components/home_log_reg.module.css"
import { Redirect } from 'react-router-dom/'

export default function Home({auth,setAuth,userInfo,setUserInfo}) {
    const [isLogin, setIsLogin] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isRedirect, setIsRedirect] = useState(false)
    const [isredirectToCopmlete, setIsredirectToCopmlete] = useState(false)
    if (auth) {
        return <Redirect to="/Home"/>
    }
    // if (auth && isRedirect || auth && userInfo) {
    //     return <Redirect to="/Home"/>
    // }
    if (isredirectToCopmlete) {
        return <Redirect to="/CompleteRegistration"/>
    }
    // if (auth && userInfo) {
    //     return <Redirect to="/Home"/>
    // }
    return (
        <div className={style.homeEnter}>
            <img className={style.background} src="https://images7.alphacoders.com/344/344223.jpg"/>
            <h1>Baller's Court</h1>
            <p>Home Of The True Hoopers. Make An NBA Games Watch List<br/> And Share Basketball Posts With Friends</p>
            <div className={style.homeButtons}>
                <button onClick={()=>setIsRegister(true)}>Register</button>
                <button onClick={()=>setIsLogin(true)}>Login</button>
            </div>
            <Register setIsredirectToCopmlete={setIsredirectToCopmlete} userInfo={userInfo} auth={auth} setAuth={setAuth} isRegister={isRegister} setIsRegister={setIsRegister} userInfo={userInfo} setUserInfo={setUserInfo}/>
            <Login setIsRedirect={setIsRedirect} setUserInfo={setUserInfo} auth={auth} setAuth={setAuth} isLogin={isLogin} setIsLogin={setIsLogin}/>
        </div>
    )
}

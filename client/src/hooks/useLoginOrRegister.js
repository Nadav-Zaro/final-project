import axios from "axios";
import { useRef ,useState} from "react";

export default function useLoginOrRegister(url,setAuth) {
    const user = useRef("")
    const email = useRef("")
    const password = useRef("")
    const confirmPassword = useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const STORAGE_KEY = "userInfo"
    if (isError) {
        setTimeout(() => {
            setIsError(null)   
        }, 1000);
    }
    function getAxios() {
        setIsLoading(true)
        axios.post(url,
            {email:email.current.value,password:password.current.value})
        .then(res=>{
            setAuth(res.data)
            setIsLoading(false)
            localStorage.setItem(STORAGE_KEY,JSON.stringify(res.data))
        })
        .catch(err=>{console.log(err.response.data.error.message);
            setIsError(err.response.data.error.message);setIsLoading(false)})
    }

    return {user,confirmPassword,email,password,getAxios,isLoading,isError}
}

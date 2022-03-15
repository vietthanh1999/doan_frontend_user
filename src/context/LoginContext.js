import React , {createContext , useState} from 'react';
import {useNavigate} from 'react-router-dom';
export const LoginContext = createContext();

const LoginContextProvider =({children}) =>{

    const [Id , setId] = useState("");
    const [Username , setUsername] = useState("");
    const [Fullname , setfullname] = useState("");
    const [isLogin , setisLogin] = useState(false);
    const [numberProductInCart, setNumberProductInCart] = useState(0);
    const navigate = useNavigate();

    // function dispatch
    const LoginDispatch = () =>{
        setId(localStorage.getItem('id'));
        setUsername(localStorage.getItem('username'));
        setfullname(localStorage.getItem('fullname'));
        if(localStorage.getItem("token") === null){
            setisLogin(false);
        }else{
            setisLogin(true);
        }
    }

    const LogoutDispatch = () =>{
        setId("");
        setUsername("");
        setfullname("");
        setisLogin(false);
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('fullname');
        localStorage.removeItem('token');
        localStorage.removeItem('cart')
        setNumberProductInCart(0)
        navigate('/')
    }

    //context data
    const LoginContextData = {
        Id : Id,
        Username :Username , 
        Fullname :Fullname , 
        IsLogin : isLogin,
        numberProductInCart: numberProductInCart,
        LoginDispatch,
        LogoutDispatch

    }
    //return provider
    return(
        <LoginContext.Provider value={LoginContextData}>
            {children}
        </LoginContext.Provider>
    )

}
export default LoginContextProvider;

import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";

import userContext from "../../context/UserContext";
import Axios from "axios";


export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErr] = useState();

    const {userData, setUserData} = useContext(userContext);
    const history  = useHistory();

    useEffect(()=>{
        if (userData.user) history.push("/");
    })


    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginRes = await Axios.post(
                "https://loginmernstack.herokuapp.com/users/login",{
                    email,
                    password                
                }
            )
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            })
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/")
        }catch(err){
            err.response.data.msg && setErr(err.response.data.msg)
        }
        
    }
    return (
        <div className = "centerBox">
            <h2 className= "centerTitle">Login</h2>
            <div className= "inputField">
                <form onSubmit = {submit}>                    
                    <input className= "textField" type = "email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />

                    <input className= "textField" type = "password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                    {errorMessage && <label className="errorMsg">{errorMessage}</label>}
                    <input type="submit" value="Login"/>

                    

                </form>
            </div>            
        </div>
    )
}

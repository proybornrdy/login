import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Axios from "axios"


import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import UserContext from "./context/UserContext"

import "./style.css";

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    })

    useEffect(()=>{
        const checkLoggedIn = async()=>{
            let token = localStorage.getItem("auth-token");
            if(token ===null){
                localStorage.setItem("auth-token","");
                token = "";
            }
            const tokenRes = await Axios.post(
                "/users/tokenCheck",
                null,
                {headers:{"auth_header_token":token}}
            )
            if (tokenRes.data){
                const userRes = await Axios.get(
                    "/users/",
                    {headers: {"auth_header_token":token}}
                )
                setUserData({
                    token,
                    user: userRes.data
                })
            }
        }
        checkLoggedIn();
    }, [])

    return (
        <>
            <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>
                <Header />
                <div id = "aligner">                    
                    <div className = "aligner-item">                        
                        <Switch>
                            <Route exact path = "/" component = {Home}/>
                            <Route path = "/login" component = {Login}/>
                            <Route path = "/register" component = {Register}/>
                        </Switch>
                    </div>
                </div>
            </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

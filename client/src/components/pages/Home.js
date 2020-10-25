import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from '../../context/UserContext';

import Axios from "axios";


export default function Home() {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();
    
    
    useEffect( ()=>{
        if (!userData.user){
            history.push("/login");
        }else{
            let token = localStorage.getItem("auth-token");
            Axios.get(
                "http://localhost:5000/users/"+ userData.user.id,
                {headers: {"auth_header_token":token}}
                )
                .then((res)=>{
                    setCurrentUser(res.data)
                }) 
        }          
    })


    return (
        <div className="centerBox">
            <h2 className= "centerTitle">WELCOME</h2>
            {currentUser ? (
                <div className="centerContent" > 
                    <h3>{currentUser.fName +" "+ currentUser.lName}</h3>                   
                    <img className="imgResize" alt="profile" src={"http://localhost:5000/"+ currentUser.path}/>
                    <label>{currentUser.email}</label>  
                </div>
            ):(
                <>                
                </>
            )}

        </div>
    )
}

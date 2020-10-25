import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";

import userContext from "../../context/UserContext";
import Axios from "axios";

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [file, setFile] = useState();

    const {userData, setUserData} = useContext(userContext);
    const history  = useHistory();

    useEffect(()=>{
        if (userData.user) history.push("/");
    })

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {email, password,firstName, lastName};   
        
        
        await Axios.post(
            "http://localhost:5000/users/register", 
            newUser
        );

        if (file){
            const fd = new FormData();
            fd.append("myImage",file, file.name)
            fd.append("email", email)
            await Axios.post(
                "http://localhost:5000/users/upload",
                fd
            )
        }
        
        
        const loginRes = await Axios.post(
            "http://localhost:5000/users/login",{
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
    }

    return (
        <div>
            <h2 className= "centerTitle">Register</h2>
            <div className = "inputField">
                <form onSubmit = {submit}>
                    
                    <input placeholder="Email" type = "email" onChange={(e)=> setEmail(e.target.value)} />

                    <input placeholder="Password" type = "password" onChange={(e)=> setPassword(e.target.value)}/>

                    
                    <input placeholder="First Name" type = "name" onChange={(e)=> setfirstName(e.target.value)} />

                    <input placeholder="Last Name" type = "name" onChange={(e)=> setlastName(e.target.value)} />
                    
                    
                    {file ? (<img className="imgResize" alt="profile" src = {URL.createObjectURL(file)}/>):(<></>)}
                                     
                    
                    <input type = "file" name ="myImage" onChange={(e) => setFile(e.target.files[0])}/>

                    

                    <input type="submit" value="Register"/>

                </form>
            </div>
            
        </div>
    )
}
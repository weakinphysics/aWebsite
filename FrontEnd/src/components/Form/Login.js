import React, {useState, useEffect} from 'react';
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from 'react-social-login-buttons';
import {useNavigate} from "react-router-dom";
import * as FaIcons from 'react-icons/fa'
import axios from 'axios';

import FormField from './FormField';

import classes from "./Login.module.css"


const url = "http://127.0.0.1:5000/users/login";

export default function Login(props){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username : "",
        password : "",
        showPassword : false
    })
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [passwordIncorrect, setPasswordIncorrect] = useState(false);
    // const [isLoggedIn, setIsLogggedIn] = useState(false);
    const myUserToken = localStorage.getItem("tokenRecvd");
    // const [redir, setReDir] = useState(false);
    const handlesFormSubmit = function(e){
        e.preventDefault();
        console.log("Form Submit");
        axios.post(url,  {
            email: formData.username,
            password: formData.password
          }).then((res)=>{
            console.log(res);
            console.log(res.data.token);
            localStorage.setItem("tokenRecvd", res.data.token);
            navigate('/home/overview');
          }).catch((err)=>{
                console.log(err.request.status);
                if(err.request.status === 400){
                    setPasswordIncorrect(true);
                    setEmailNotFound(false);
                }
                else if(err.request.status === 402){
                    setEmailNotFound(true);
                    setPasswordIncorrect(false);
                }
                else if(err.request.status === 403){
                    setEmailNotFound(false);
                    setPasswordIncorrect(false);
                }
                console.log(err);
                
          });
    }
    useEffect(()=>{
        if(myUserToken){
            navigate("/home/overview");
        }
    }, []);
    
    const handlesUsername = function(e){
        setFormData({...formData, username : e.target.value});
    }
    const handlesPassword = function(e){
        setFormData({...formData, password : e.target.value});
    }
    const handlesPasswordType = function(e){
        setFormData({...formData, showPassword : !formData.showPassword});
    }
    return(
        <div className = {classes["mainLogin"]}> 
            <div className={classes["loginText"]}>
                <h1 style = {{color: "#3857b8", fontSize: "3em"}}>Hello !</h1>
                <h1>Welcome back chief!</h1>
            </div>
            <div className={classes["formCenter"]}>
                <form className={classes["formFields"]} onSubmit={handlesFormSubmit}>
                        <div className = {classes["formField"]}>
                            <FormField fieldName = {formData.username} type = "email" handlesFieldChange = {handlesUsername} handlesForm = {handlesFormSubmit} useCase = "username"/>
                            <FaIcons.FaSnowman className = {classes.eyeIcon} />
                        </div>
                        {emailNotFound && <div style ={{color:"red"}}>Email was not found</div>}
                        <div className = {classes["formField"]}>
                            <FormField fieldName = {formData.password} type = {formData.showPassword?"text":"password"} handlesFieldChange={handlesPassword} handlesForm = {handlesFormSubmit} useCase = "password" />  
                            {
                                (formData.showPassword? <FaIcons.FaEyeSlash className = {classes.eyeIcon} onClick = {handlesPasswordType}/>  : 
                                <FaIcons.FaEye  className = {classes.eyeIcon} onClick = {handlesPasswordType}/>  )
                            }
                        </div>
                        {passwordIncorrect && <div style = {{color: "red"}}>Incorrect password </div>}
                </form>
                <div className="formButtons">
                    <div className={classes["signInButton"]}>
                        <button className={classes["formFieldButton"]} onClick = {handlesFormSubmit}>Sign In</button>
                    </div>
                    <div className={classes["socialMediaButtons"]}>
                        <div className={classes["gButton"]}>
                            <GoogleLoginButton  onClick={() => alert("You will be redirected to google")} />
                        </div>
                        <div className={classes["gButton"]}>
                            <FacebookLoginButton  onClick={() => alert("You will be redirected to google")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
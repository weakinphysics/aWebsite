import React, {useState} from "react";

import FormField from "./FormField";

import classes from "./Register.module.css";


export default function Register(){
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        username: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        termsAndConditions: false,
    }) 
    const handlesFormSubmit = function(e){
        e.preventDefault();
        console.log("Form Submit");
        //if(!props.authentication()) return false;
        return true;
    }
    const handlesFirstName = function(e){
        setFormData({...formData, firstName : e.target.value}); 
    }
    const handlesLastName = function(e){
        setFormData({...formData, lastName : e.target.value}); 
    }
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
        <div className={classes["formCenter"]}>
            <form className={classes["formFields"]} onSubmit={handlesFormSubmit}>
                <FormField fieldName = {formData.firstName} type="text" handlesFieldChange = {handlesFirstName} useCase = "first name"/>
                <FormField fieldName = {formData.lastName} type="text" handlesFieldChange = {handlesLastName} useCase = "last name"/>
                <FormField fieldName = {formData.username} type = "email" handlesFieldChange = {handlesUsername} useCase = "email id" />
                <FormField fieldName = {formData.password} type = {formData.showPassword?"text":"password"} handlesFieldChange={handlesPassword} useCase = "password"/>
                <label>Show Password</label>
                <input type="checkbox" onChange={handlesPasswordType}/>  
                <div className={classes["formField"]}>
                    <button className={classes["formFieldButton"]} type="submit">Sign up</button>
                </div>
            </form>
        </div>
    );
}

/*
<div className="socialMediaButtons">
                <div className="googleButton">
                    <GoogleLoginButton onClick={() => alert("You will be redirected to google")} />
                </div>
            </div>
*/
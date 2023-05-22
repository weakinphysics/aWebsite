import React, {useState} from 'react';
import axios from 'axios';
import FormField from '../Form/FormField';

import Calendar from "./Calendar";

import classes from './Inbox.module.css';


const url = "http://127.0.0.1:5000/users/createEntry";


function Inbox() {
  const [Name, setName] = useState("");
  const [Position, setPosition] = useState("");
  const [Office, setOffice] = useState("");
  const [age, setAge] = useState("");
  const [start, setStart] = useState(new Date());
  const [salary, setSalary] = useState("");

  const formSubmitHandler = (e)=>{
    axios.post(url, {
      name: Name,
      position: Position,
      office: Office,
      age: age,
      date: start,
      salary: salary
    }).then((res)=>console.log(res));
  }

  return (
    <div className = {classes.container}>
        <form className = {classes.formDiv} onSubmit = {formSubmitHandler}>
          <div className = {classes.title}>
            Create new user
          </div>
          <div className = {classes.formRow}>
            <div className = {classes.ffholder}><FormField type = "text" useCase = {"name"} handlesFieldChange = {(e)=>setName(e.target.value)} handlesForm = {formSubmitHandler}/></div>
            <div className = {classes.ffholder}><FormField type = "text" useCase = {"position"} handlesFieldChange = {(e)=>setPosition(e.target.value)} handlesForm = {formSubmitHandler}/></div>
          </div>
          <div className = {classes.formRow}>
            <div className = {classes.ffholder}><FormField type = "text" useCase = {"office"} handlesFieldChange = {(e)=>setOffice(e.target.value)} handlesForm = {formSubmitHandler}/></div>
            <div className = {classes.ffholder}><FormField type = "number" useCase = {"age"} handlesFieldChange = {(e)=>setAge(e.target.value)} handlesForm = {formSubmitHandler}/></div>
          </div>
          <div className = {classes.formRow}>
            <div className = {classes.datePicker}>
              <Calendar handlesDate = {(d)=>{
                setStart(d);
              }}/>
            </div>
            <div className = {classes.ffholder}><FormField type = "number" useCase = {"salary"} handlesFieldChange = {(e)=>setSalary(e.target.value)} handlesForm = {formSubmitHandler}/></div>
          </div>
          <button type="submit" className={classes.btnSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default Inbox
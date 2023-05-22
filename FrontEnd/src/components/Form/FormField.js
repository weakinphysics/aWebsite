import React from 'react';
import classes from "./FormField.module.css";
export default function FormField(props){
    let fieldName = props.fieldName;
        return (
            <input
                type={props.type}
                id={props.type}
                onKeyDown={(e)=>{
                    console.log(e);
                    if(e.key === 'Enter'){
                        props.handlesForm(e);
                    }
                }}
                className={classes["formFieldInput"]}
                placeholder={props.useCase}
                name="email"
                value={fieldName}
                label = {props.type}
                onChange={props.handlesFieldChange}
            />
        );
    
    
}
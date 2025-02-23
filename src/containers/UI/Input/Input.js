import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement=null;
    const inputClasses=['InputElement'];
    if(!props.validation&&props.touched){
        inputClasses.push('Invalid');
    };
    const classes=inputClasses.join(' ');
    switch(props.elementType){
        case ('input'):
        inputElement=<input className={classes+' common-input'} {...props.elementConfig} value={props.value} 
        onChange={props.changed}/>
        break;
        case ('textarea'):
        inputElement=<textarea className={classes+' common-input'} {...props.elementConfig} value={props.value} 
        onChange={props.changed}/>
        break;
        case('select'):
        inputElement=
                (<select className={classes}  value={props.value} onChange={props.changed}>
                  {props.elementConfig.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.displayValue}
                      </option>
                  ))}  
                </select>)
        break;
        default:
        inputElement=<input className={classes} {...props.elementConfig} value={props.value}/>

    }
    return(
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input
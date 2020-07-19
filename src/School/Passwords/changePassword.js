import React ,{Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import './Password.css';
import Spinner from '../../containers/UI/Spinner/Spinner'

class SetPassword extends Component {
    state={
        fields:{
            oldPassword:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            newPassword:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            
        },
        clicked:false
    }

    checkvalidity=(value,touched)=>{
        return (value.trim()!=='' && touched)
    }
    clickChangeHandler=(event,key)=>{
        var updatedfields={...this.state.fields};
        const newfeildValue={...this.state.fields[key]}
        
        const validity=this.checkvalidity(event.target.value,true);
        newfeildValue.validity=validity
        newfeildValue.value=event.target.value
        updatedfields[key]=newfeildValue;
        this.setState({fields:updatedfields})
    }
    onFocusHAndler=(key)=>{
        var updatedfields={...this.state.fields};
        const newfeildValue={...this.state.fields[key]}
        const validity=this.checkvalidity(newfeildValue.value,true);
        newfeildValue.validity=validity
        newfeildValue.touched=true
        newfeildValue.blurred=false;
        updatedfields[key]=newfeildValue;
        this.setState({fields:updatedfields})
    }
    onBlurHandler=(key)=>{
        var updatedfields={...this.state.fields}
        const newfeildValue={...this.state.fields[key]}
        newfeildValue.blurred=true;
        
        const validity=this.checkvalidity(newfeildValue.value,this.state.fields[key].touched);
        newfeildValue.validity=validity
        updatedfields[key]=newfeildValue;
        this.setState({fields:updatedfields})
    }
    onSetPassword=()=>{
        this.setState({clicked:true})
        this.props.onSetPasswordRequest(
            this.state.fields.oldPassword.value,
            this.state.fields.newPassword.value,
            this.props.rol
        )

    }
    render(){

        var update=null;
        if(this.props.updated && this.state.clicked){
            update=<p>Password Updated</p>
        }
        var error=null;
        if(this.props.error && this.state.clicked){
            error=<p>Something went wrong</p>
        }
        var spinner=null;
        if(this.props.loading){
            spinner=<Spinner />
        }
        let formElementArray=[];
        var formValidity=false;
        for(let key in this.state.fields){
            formValidity=formValidity || (!this.state.fields[key].validity || !this.state.fields[key].touched )
            formElementArray.push({
                id: key
            })
        }
        
            
            let form=(
                <div >
                {formElementArray.map(formElement => {
                    var classname=['signupInput']
                    if(!this.state.fields[formElement.id].validity && this.state.fields[formElement.id].blurred){
                        classname.push('invalid')
                    }
                return (
                    <div key={formElement.id}>
                        <span className={'SignupInputText'}>{formElement.id}:</span>
                <input 
                value={this.state.fields[formElement.id].value}
                className={classname.join(' ')+' common-input'}
                 onChange={(event) =>this.clickChangeHandler(event,formElement.id)} 
                 onFocus={this.onFocusHAndler.bind(this,formElement.id)} 
                 onBlur={this.onBlurHandler.bind(this,formElement.id)}/>
                 </div>)
                }
                )}
                </div>
            )

        return(
            <div className="schoolPasswordMain">
                <div>Warning: This option Will set a new password</div>
                {form}
                <br />
                <br />
                <button className="schoolPasswordButton" 
                type="button"
                onClick={this.onSetPassword}
                disabled={formValidity}
                >CHANGE PASSWORD</button>
                {update}
                {error}
                {spinner}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      loading:state.school.loading,
      error:state.school.teacherUpdateError,
      updated:state.school.teacherUpdated,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onSetPasswordRequest:(oldPassword,newPassword,role)=>dispatch(actions.changePassword(oldPassword,newPassword,role))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SetPassword)
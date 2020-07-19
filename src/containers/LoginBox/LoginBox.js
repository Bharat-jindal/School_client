import React ,{Component} from 'react';
import './LoginBox.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

class Signup extends Component {
    state={
        info:false,
        fields:{
            username:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            password:{
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

    onButtonClicked=()=>{
        this.setState({clicked:true});
        this.props.clicked(this.state.fields.username.value,this.state.fields.password.value)
    }

    render(){
        var error=null;
        if(this.state.clicked){
            error=this.props.error
        }
        let formElementArray=[];
        for(let key in this.state.fields){
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
                className={classname.join(' ')}
                 onChange={(event) =>this.clickChangeHandler(event,formElement.id)} 
                 onFocus={this.onFocusHAndler.bind(this,formElement.id)} 
                 onBlur={this.onBlurHandler.bind(this,formElement.id)}/>
                 </div>)
                }
                )}
                </div>
            )

        return(
            <div className="SignupMain">
                {form}
                <br />
                <br />
                <button className="SignupMainButton" 
                type="button"
                onClick={this.onButtonClicked}
                disabled={(!this.state.fields.username.validity || !this.state.fields.username.touched )
                        || (!this.state.fields.password.validity ||!this.state.fields.password.touched)}
                >LOGIN</button>
                <br />
                {this.props.loading?<span className="fa fa-spinner"></span>:null}
                {this.props.role==='school'?<span className="PasswordOptions" onClick={this.props.setClicked}>Set Password</span>:null}
                <p>{error}</p>
            </div>
        )
    }
}

export default Signup;
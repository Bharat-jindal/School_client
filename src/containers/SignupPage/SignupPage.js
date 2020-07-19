import React ,{Component} from 'react';
import './SignupPage.css'

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
            name:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            street:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            town:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            district:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            state:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            ProductKey:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            }
        }
    }

    checkvalidity=(value,touched)=>{
        return (value.trim()!=='' && touched)
    }

    changeinfoHAndler=()=>{
        const info=this.state.info;
        this.setState({info:!info})
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

    render(){
        var info=null;
        if(this.state.info){
            info=<p onClick={this.changeinfoHAndler}>Contact us to get your product key</p>
        }
        let formElementArray=[];
        var formValidity=false
        for(let key in this.state.fields){
            formValidity=formValidity || (!this.state.fields[key].validity || !this.state.fields[key].touched)
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
            <div className="SignupMainsign">
                {form}
                <p style={{cursor:'pointer',textDecoration:'underline'}} onClick={this.changeinfoHAndler}>Know More</p>
                {info}
                <button className="common-form-buttons" 
                style={{marginTop:'10px',width:'180px',height:'40px',lineHeight:'40px'}}
                onClick={()=>this.props.clicked(this.state.fields)}
                disabled={formValidity}>SIGNUP</button>
                    <p>{this.props.error?'Something Went Wrong':null}</p>
            </div>
        )
    }
}

export default Signup;
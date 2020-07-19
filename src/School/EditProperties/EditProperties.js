import React ,{Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import './EditProperties.css'

class EditProperties extends Component {
    state={
        fields:{
            name:{
                value:'',
                validity:true,
                blurred:true,
                touched:true
            },
            streat:{
                value:'',
                validity:true,
                blurred:true,
                touched:true
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
                touched:true
            },
            state:{
                value:'',
                validity:true,
                blurred:true,
                touched:true
            }
        }
    }
    componentDidMount(){
        var updatedField={...this.state.fields};
        updatedField.name.value=this.props.name;
        updatedField.streat.value=this.props.streat;
        updatedField.town.value=this.props.town;
        updatedField.district.value=this.props.district;
        updatedField.state.value=this.props.state;
        this.setState({fields:updatedField})
    }

    checkvalidity=(value,touched)=>{
        return (value.trim()!=='')
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

        var update=null;
        if(this.props.updated){
            update=<p>Info Updated</p>
        }
        var error=null;
        if(this.props.error){
            error=<p>Something went wrong</p>
        }
        let formElementArray=[];
        var formValidity=false;
        for(let key in this.state.fields){
            formValidity=formValidity || (!this.state.fields[key].validity )
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
                        <span className={'SignupInputText'}>{formElement.id.toUpperCase()}:</span>
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
            <div className="SignupMain">
                {form}
                <br />
                <br />
                <button className="common-form-buttons" style={{fontSize:'large',height:'40px',lineHeight:"40px"}}
                type="button"
                onClick={()=>this.props.onUpdateSchoolRequest(
                    this.state.fields.name.value,
                    this.state.fields.streat.value,
                    this.state.fields.town.value,
                    this.state.fields.district.value,
                    this.state.fields.state.value,
                )}
                disabled={formValidity}
                >UPDATE</button>
                {update}
                {error}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      loading:state.auth.loading,
      error:state.auth.error,
      updated:state.auth.updated
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onUpdateSchoolRequest:(name,streat,town,district,state)=>dispatch(actions.updateSchool(name,streat,town,district,state))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(EditProperties)
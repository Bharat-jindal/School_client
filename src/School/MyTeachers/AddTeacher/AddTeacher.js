import React ,{Component} from 'react';
import './AddTeacher.css'
import {connect} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.css";

import * as actions from '../../../store/actions/index'

class AddTeacher extends Component {
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
            }
        },
        clicked:false
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

    addTeacher =() =>{
        this.setState({clicked:true});
        this.props.onAddTeacherRequest(this.state.fields.username.value,
            this.state.fields.password.value,
                this.state.fields.name.value,
                this.state.fields.street.value,
                this.state.fields.town.value,
                this.state.fields.district.value,
                this.state.fields.state.value
        )
    }

    closePropertiesHandler=()=>{
        this.setState({clicked:false})
    }

    render(){
        let teacherElementArray=[];
        if(this.props.updated && this.state.clicked){
            console.log(this.props.teacher)
            for(let key in this.props.teacher){
                if(key!=='__v' && key !=='_id' && key!=='_id' && key!=='admin' && key!=='tests' && key!=='schoolname')
                teacherElementArray.push({
                    id: key
                })
            }
            var properties=(<div className="AddedTeacherProperties">
                {teacherElementArray.map(property=>{
                return <div key={property.id}>
                    <div key={property.id}><span className="SchoolTitles">{property.id}</span>:<span>{this.props.teacher[property.id]}</span></div>
                </div>}
                )
                
            }
            <div><span className="SchoolTitles">Password</span><span className="SchoolTitles">{this.state.fields.password.value}</span></div>
            <button className="SchoolPropertiesEditButton" onClick={this.closePropertiesHandler}>Close</button>
            
        </div>)
        }


        var error=null;
        if(this.props.error && this.state.clicked){
            error=<p>Somethin Went Wrong</p>
        }
        
        var spinner=null;
        if(this.props.loading){
            spinner=<span className="fa fa-spinner"></span>
        }
        var added=null;
        if(this.props.updated && this.state.clicked){
            added=<p>Student added successully</p>
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
                    var classname=['AddTeacherInput']
                    if(!this.state.fields[formElement.id].validity && this.state.fields[formElement.id].blurred){
                        classname.push('invalid')
                    }
                return (
                    <div key={formElement.id}>
                        <span className={'AddTeacherInputText'}>{formElement.id}:</span>
                <input 
                value={this.state.fields[formElement.id].value}
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
            <div className="AddTeacherMainsign">
                {form}
                <button className="AddTeacherMainButton"
                onClick={()=>this.addTeacher()}
                disabled={formValidity}>AddTeacher</button>
                {error}
                {spinner}
                {added}
                {properties}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        updated:state.school.teacherUpdated,
        error:state.school.teacherUpdateError,
        teacher:state.school.teacher,
        loading:state.school.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAddTeacherRequest:(username,password,name,streat,town,district,state)=>dispatch((actions.addTeacher(username,password,name,streat,town,district,state)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddTeacher);
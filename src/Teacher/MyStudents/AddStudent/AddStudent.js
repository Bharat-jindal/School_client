import React ,{Component} from 'react';
import './AddStudent.css'
import {connect} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.css";

import * as actions from '../../../store/actions/index'

class AddStudent extends Component {
    state={
        info:false,
        fields:{
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
            fathername:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            mothername:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            class:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            rollno:{
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

    addStudent =() =>{
        this.setState({clicked:true});
        this.props.onAddStudentRequest(
            this.state.fields.password.value,
                this.state.fields.name.value,
                this.state.fields.street.value,
                this.state.fields.town.value,
                this.state.fields.district.value,
                this.state.fields.state.value,
                this.state.fields.fathername.value,
                this.state.fields.mothername.value,
                this.state.fields.class.value,
                this.state.fields.rollno.value,
        )
    }

    closePropertiesHandler=()=>{
        this.setState({clicked:false})
    }

    render(){
        var spinner=null;
        if(this.props.loading){
            spinner=<span className="fa fa-spinner"></span>
        }
        let studentElementArray=[];
        if(this.props.updated && this.state.clicked){
            for(let key in this.props.student){
                if(key!=='__v' && key !=='_id' && key!=='tests' && key!=='schoolname'  && key!=='books' && key!=='fees')
                studentElementArray.push({
                    id: key
                })
            }
            var properties=(<div className="AddedTeacherProperties">
                {studentElementArray.map(property=>{
                return <div key={property.id}>
                    <div key={property.id}><span className="SchoolTitles">{property.id}</span>:<span>{this.props.student[property.id]}</span></div>
                </div>}
                )
                
            }
            <div><span className="SchoolTitles">Password:</span><span className="SchoolTitles">{this.state.fields.password.value}</span></div>
            <button className="SchoolPropertiesEditButton" onClick={this.closePropertiesHandler}>Close</button>
            
        </div>)
        }


        var error=null;
        if(this.props.error && this.state.clicked){
            error=<p>Somethin Went Wrong</p>
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
                onClick={()=>this.addStudent()}
                disabled={formValidity}>AddStudent</button>
                {spinner}
                {error}
                {added}
                {properties}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        updated:state.teacher.studentUpdated,
        error:state.teacher.studentUpdateError,
        student:state.teacher.student,
        loading:state.teacher.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAddStudentRequest:(password,name,streat,town,district,state,fathername,mothername,classNum,rollno)=>dispatch((actions.addStudent(password,name,streat,town,district,state,fathername,mothername,classNum,rollno)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddStudent);
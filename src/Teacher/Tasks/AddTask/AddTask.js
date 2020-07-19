import React ,{Component} from 'react';
import './AddTask.css'
import {connect} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.css";

import * as actions from '../../../store/actions/index'

class Addtask extends Component {
    state={
        info:false,
        title:{
            value:'',
            touched:false,
            blurred:true,
            validity:true,
        },
        class:{
            value:'',
            touched:false,
            blurred:true,
            validity:true,
        },
        fields:[{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
        ],
        clicked:false
    }

    checkvalidity=(value,touched)=>{
        return (value.trim()!=='' && touched)
    }

    changeinfoHAndler=()=>{
        const info=this.state.info;
        this.setState({info:!info})
    }
    clickChangeHandler=(event,index)=>{
        var updatedfields=[...this.state.fields];
        const validity=this.checkvalidity(event.target.value,true);
        updatedfields[index].validity=validity
        updatedfields[index].value=event.target.value
        this.setState({fields:updatedfields})
    }
    onFocusHAndler=(index)=>{
        var updatedfields=[...this.state.fields];
        const validity=this.checkvalidity(updatedfields[index].value,true);
        updatedfields[index].validity=validity
        updatedfields[index].touched=true
        updatedfields[index].blurred=false;
        this.setState({fields:updatedfields})
    }
    onBlurHandler=(index)=>{
        var updatedfields=[...this.state.fields]
        updatedfields[index].blurred=true;
        
        const validity=this.checkvalidity(updatedfields[index].value,this.state.fields[index].touched);
        updatedfields[index].validity=validity
        this.setState({fields:updatedfields})
    }

    titleClickedHandler=(event)=>{
        const validity=this.checkvalidity(event.target.value,true);
        const newTitle={...this.state.title};
        newTitle.validity=validity;
        newTitle.touched=true;
        newTitle.value=event.target.value;
        newTitle.blurred=true
        this.setState({title:newTitle})
    }
    titleFocusHandler=()=>{
        const validity=this.checkvalidity(this.state.title.value,true)
        const newTitle={...this.state.title};
        newTitle.validity=validity;
        newTitle.touched=true;
        newTitle.blurred=false
        this.setState({title:newTitle})
    }
    titleBlurHandler=()=>{
        const validity=this.checkvalidity(this.state.title.value,this.state.title.touched)
        const newTitle={...this.state.title};
        newTitle.validity=validity;
        newTitle.blurred=true
        this.setState({title:newTitle})

    }
    classClickedHandler=(event)=>{
        const validity=this.checkvalidity(event.target.value,true);
        const newTitle={...this.state.class};
        newTitle.validity=validity;
        newTitle.touched=true;
        newTitle.value=event.target.value;
        newTitle.blurred=true
        this.setState({class:newTitle})
    }
    classFocusHandler=()=>{
        const validity=this.checkvalidity(this.state.class.value,true)
        const newTitle={...this.state.class};
        newTitle.validity=validity;
        newTitle.touched=true;
        newTitle.blurred=false
        this.setState({class:newTitle})
    }
    classBlurHandler=()=>{
        const validity=this.checkvalidity(this.state.class.value,this.state.title.touched)
        const newTitle={...this.state.class};
        newTitle.validity=validity;
        newTitle.blurred=true
        this.setState({class:newTitle})

    }

    addTask =() =>{
        this.setState({clicked:true});
        var contents=[];
        for(let i=0;i<this.state.fields.length;i++){
            contents.push({content:this.state.fields[i].value})
        }
        this.props.onAddTaskRequest(
            this.state.title.value,
            this.state.class.value,
            contents
        )
    }

    closePropertiesHandler=()=>{
        this.setState({clicked:false})
    }

    addContentParagraph=()=>{
        var updatedfields=[...this.state.fields];
        updatedfields.push({
            value:'',
            validity:true,
            blurred:true,
            touched:false
        })
        this.setState({fields:updatedfields})
    }

    render(){
        var spinner=null;
        if(this.props.loading){
            spinner=<span className="fa fa-spinner"></span>
        }
        var properties=null
        if(this.props.updated && this.state.clicked){
            properties=(<div className="AddedTaskProperties">
                <span className="TaskTitles">Title:{this.props.task.title}</span>
                <br />
                <br />
                {this.props.task.contents.map((content,index)=>{
                return <div key={index}>
                    <div><span >{content.content}</span></div>
                    <br />
                </div>}
                )
                
            }
            <button className="SchoolPropertiesEditButton" onClick={this.closePropertiesHandler}>Close</button>
            
        </div>)
        }


        var error=null;
        if(this.props.error && this.state.clicked){
            error=<p>Somethin Went Wrong</p>
        }
        var added=null;
        if(this.props.updated && this.state.clicked){
            added=<p>task added successully</p>
        }
        var formValidity=!this.state.title.validity || !this.state.title.touched
        formValidity=formValidity||!this.state.class.validity || !this.state.class.touched
        for(let i=0; i<this.state.fields.length;i++){
            formValidity=formValidity || (!this.state.fields[i].validity || !this.state.fields[i].touched)

        }
        var classname=['AddTeacherInput']
        if(!this.state.title.validity && this.state.title.blurred){
            classname.push('invalid')
        }
        var titleInput=<div >
            <span className={'AddTeacherInputText'}>Title:</span>
            <input 
            value={this.state.title.value}
            className={classname.join(' ')}
            onChange={this.titleClickedHandler} 
            onFocus={this.titleFocusHandler} 
            onBlur={this.titleFocusHandler}/>
        </div>
        var classInput=<div >
        <span className={'AddTeacherInputText'}>Class:</span>
        <input 
        value={this.state.class.value}
        className={classname.join(' ')}
        onChange={this.classClickedHandler} 
        onFocus={this.classFocusHandler} 
        onBlur={this.classFocusHandler}/>
    </div>
            
            let form=(
                <div >
                    {titleInput}
                    {classInput}
                    <br />
                {this.state.fields.map((formElement,index) => {
                    var classname=['AddTextArea']
                    if(!formElement.validity && formElement.blurred){
                        classname.push('invalid')
                    }
                return (
                    <div key={index}>
                <textarea 
                value={formElement.value}
                className={classname.join(' ')}
                 onChange={(event) =>this.clickChangeHandler(event,index)} 
                 onFocus={this.onFocusHAndler.bind(this,index)} 
                 onBlur={this.onBlurHandler.bind(this,index)}/>
                 </div>)
                }
                )}
                <div>
                <span className="fa fa-plus-circle AddContent" onClick={this.addContentParagraph}></span>
                </div>
                </div>
            )

        return(
            <div className="AddTaskMainsign">
                {form}
                <button className="AddTeacherMainButton"
                onClick={()=>this.addTask()}
                disabled={formValidity}>Addtask</button>
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
        task:state.teacher.task,
        loading:state.teacher.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAddTaskRequest:(title,classNum,contents)=>dispatch((actions.addTask(title,classNum,contents)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Addtask);
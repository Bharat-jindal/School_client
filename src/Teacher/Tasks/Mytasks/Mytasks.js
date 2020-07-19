import React ,{Component} from 'react';
import {connect} from 'react-redux';

import './Mytasks.css'
import Backdrop from '../../../containers/UI/Backdrop/Backdrop';
import AddTask from '../AddTask/AddTask'
import * as actions from '../../../store/actions/index';
import Spinner from '../../../containers/UI/Spinner/Spinner'

class MyStuents extends Component{

    state={
        task:null,
        details:false,
        add:false,
        delete:false,
        delClicked:false
    }

    componentDidMount(){
        this.props.getMytasks()
    }
    hideBackDrop=()=>{
        this.setState({task:null,details:false,add:false,delete:false,delClicked:false})
    }
    showProperties=(task)=>{
        this.setState({details:true,task:task})
    }
    showAddTask=()=>{
        this.setState({add:true})
    }
    showDeleteProperties=(task)=>{
        this.setState({delete:true,task:task})
    }
    deleteHandler=()=>{
        this.setState({delClicked:true});
        this.props.onDeletRequest(this.state.task._id)
    }

    classChangeHandler=(event)=>{
        var newClass={...this.state.class}
        newClass.value=event.target.value
        this.setState({class:newClass})
    }

    render(){
    var spinner=null;
    if(this.props.loading){
        spinner=<Spinner />
    }
    var tasksKeyArray=this.props.tasks;

    var add=null
    if(this.state.add){
        add=<AddTask />
    }
    var deletes=null;
    var delInfo=null;
    if(this.state.delClicked && this.props.delError){
        delInfo=<p>Someting went wrong</p>
    }
    if(this.state.delClicked && this.props.delSuccess){
        delInfo=<p>Deleted SuccessFully</p>
    }

        if(this.state.delete){
            deletes =<div className="DeleteBox">
                <p><b>Warning</b>: This task wil be deleted PERMANENTLY</p>
                <button onClick={this.hideBackDrop} className="CancelButton">CANCEL</button>
                <button onClick={this.deleteHandler} className="DeleteButton">DELETE</button>
                {delInfo}
            </div>
        }
    var properties=null;
    if(this.state.details){
        properties=(
            <div className="TeacherProperties">
                <span className="SchoolTitles">Title:</span><span>{this.state.task.title}</span>
                <div style={{height:'25px'}}></div>
                {
                    this.state.task.contents.map((content,index)=>{
                        return <div key={index}>
                            <div >{content.content}</div>
                        </div>
                    })
                }
            </div>
        )
        
    }
    

    var tasks=null;
    tasks=tasksKeyArray.map(task=>{
        return <div className="TeacherIntro" key={task._id}>
            {task.title}
            <br />
            <div className="MyTeachersEdit">
                <button onClick={()=>this.showProperties(task)}
                    className="common-form-buttons" style={{marginLeft:'5px',marginRight:'5px'}}>Details</button>
                <button onClick={()=>this.showDeleteProperties(task)}
                    className="common-form-buttons" style={{marginLeft:'5px',marginRight:'5px'}}>DELETE</button>
            </div>
        </div>
    })
    return (
        <div>
            {spinner}
            {tasks}
            {add}
            <span className="fa fa-plus-circle" onClick={this.showAddTask}></span>
            {deletes}
            {properties}
            <Backdrop show={this.state.edit || this.state.set ||this.state.details || this.state.add || this.state.delete} 
            clicked={this.hideBackDrop} />
        </div>
    )
    }
}

const mapStateToProps=(state)=>{
    return {
        tasks:state.teacher.tasks,
        delError:state.teacher.studDelErr,
        delSuccess:state.teacher.studDelSuccess,
        loading:state.teacher.loading
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        getMytasks:()=>dispatch(actions.getMyTasks()),
        onDeletRequest:(_id)=>dispatch(actions.delTask(_id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyStuents)
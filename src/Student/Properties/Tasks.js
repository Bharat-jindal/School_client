import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import './Properties.css';

import BackDrop from '../../containers/UI/Backdrop/Backdrop';

class GetBooks extends Component {

    state={
        task:null,
        show:false
    }

    componentDidMount(){
        this.props.onGetTasksRequest()
    }

    showDetailHandler=(task)=>{
        this.setState({task:task,show:true})
    }
    hideDetailHandler=()=>{
        this.setState({task:null,show:false})
    }
    
    render(){
        var tasks=this.props.tasks.map((task,index)=>{
            return <div key={index} className="StudentTaskPropList">
                <span >{task.title.toUpperCase()}</span>
                <br />
                <span >By: {task.teacher.name}</span>
                <button onClick={this.showDetailHandler.bind(this,task)} className="studentPropDetailButton">DETAILS</button>
            </div>
        })
        var properties=null;
        if(this.state.show){
            properties=(<div className="AddedTaskProperties">
                <span className="TaskTitles">Title:{this.state.task.title}</span>
                <br />
                <br />
                {this.state.task.contents.map((content,index)=>{
                return <div key={index}>
                    <div><span >{content.content}</span></div>
                    <br />
                </div>}
                )
                
            }
            <button className="SchoolPropertiesEditButton" onClick={this.hideDetailHandler}>Close</button>
            
        </div>)
        }
        return <div>
        {this.props.loading?<span className="fa fa-spinner studentPropertiesSpinner"></span>:null}
            {this.props.error?<h2 style={{color:'#ff9900'}}>Something Went Wrong</h2>:null}
            {tasks}
            {properties}
            <BackDrop show={this.state.show} clicked={this.hideDetailHandler} />
        </div>
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.student.loading,
        tasks:state.student.tasks,
        error:state.student.error
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onGetTasksRequest:()=>dispatch(actions.getStudentProppertyTasks())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GetBooks)
import React ,{Component} from 'react';
import {connect} from 'react-redux';

import './MyStudents.css'
import Backdrop from '../../containers/UI/Backdrop/Backdrop';

import * as actions from '../../store/actions/index';
import StudentEditor  from './EditStudent';
import SetPassword from './SetPAssword';
import AddStudent from './AddStudent/AddStudent';

class MyStuents extends Component{

    state={
        set:false,
        edit:false,
        student:null,
        details:false,
        add:false,
        delete:false,
        delClicked:false,
        class:{
            value:''
        }
    }
    hideBackDrop=()=>{
        this.setState({set:false,edit:false,student:null,details:false,add:false,delete:false,delClicked:false})
    }
    showTeacherEditor=(student)=>{
        this.setState({edit:true,student:student})
    }
    showTeacherPasswordSetter=(student)=>{
        this.setState({set:true,student:student})
    }
    showProperties=(student)=>{
        this.setState({details:true,student:student})
    }
    showAddTeacher=()=>{
        this.setState({add:true})
    }
    showDeleteProperties=(student)=>{
        this.setState({delete:true,student:student})
    }
    deleteHandler=()=>{
        this.setState({delClicked:true});
        this.props.onDeletRequest(this.state.student._id,this.state.class.value)
    }

    classChangeHandler=(event)=>{
        var newClass={...this.state.class}
        newClass.value=event.target.value
        this.setState({class:newClass})
    }
    submitClassHandler=()=>{
        this.props.getMyStudents(this.state.class.value)
    }

    render(){
        var spinner=null;
        if(this.props.loading){
            spinner=<span className="fa fa-spinner"></span>
        }
    var studentsKeyArray=this.props.students;
    var editior=null;
    if(this.state.edit){
        editior=<StudentEditor 
                    _id={this.state.student._id}
                    name={this.state.student.name}
                    streat={this.state.student.streat}
                    town={this.state.student.town}
                    district={this.state.student.district}
                    state={this.state.student.state}
                    fathername={this.state.student.fathername}
                    mothername={this.state.student.mothername}
                    classNum={this.state.class.value}
            />
    }
    var set=null;
    if(this.state.set){
        set=<SetPassword _id={this.state.student._id} />
    }
    var add=null
    if(this.state.add){
        add=<AddStudent />
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
                <p>Warning: It wil be deleted PERMANENTLY</p>
                <button onClick={this.hideBackDrop} className="CancelButton">CANCEL</button>
                <button onClick={this.deleteHandler} className="DeleteButton">DELETE</button>
                {delInfo}
            </div>
        }
    var properties=null;
    if(this.state.details){
        let formElementArray=[];
        for(let key in this.state.student){
            if(key!=='__v' && key !=='_id' && key!=='admin' && key!=='tests' && key!=='books'  && key!=='schoolname' && key!=='fees')
            formElementArray.push({
                id: key
            })
        }
        properties=(
            <div className="TeacherProperties">
                {
                    formElementArray.map(property=>{
                        return <div key={property.id}>
                            <div key={property.id}><span className="SchoolTitles">{property.id}</span>:<span>{this.state.student[property.id]}</span></div>
                        </div>
                    })
                }
            </div>
        )
        
    }
    

    var students=null;
    students=studentsKeyArray.map(student=>{
        return <div className="TeacherIntro" key={student.username}>
            {student.name}
            <br />
            <div className="MyTeachersEdit">
                <button onClick={()=>this.showTeacherEditor(student)}>Edit</button>
                <button onClick={()=>this.showTeacherPasswordSetter(student)}>Set Password</button>
                <button onClick={()=>this.showProperties(student)}>Details</button>
                <button onClick={()=>this.showDeleteProperties(student)}>DELETE</button>
            </div>
        </div>
    })
    return (
        <div>
            <div>
                <input onChange={(event)=>this.classChangeHandler(event)} value={this.state.class.value}/>
                <button onClick={()=>this.submitClassHandler()}>GET STUDENTS</button>
            </div>
            {spinner}
            {students}
            {editior}
            {set}
            {properties}
            {add}
            <span className="fa fa-plus-circle" onClick={this.showAddTeacher}></span>
            {deletes}
            <Backdrop show={this.state.edit || this.state.set ||this.state.details || this.state.add || this.state.delete} 
            clicked={this.hideBackDrop} />
        </div>
    )
    }
}

const mapStateToProps=(state)=>{
    return {
        students:state.teacher.students,
        delError:state.teacher.studDelErr,
        delSuccess:state.teacher.studDelSuccess,
        loading:state.teacher.loading
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        getMyStudents:(classNum)=>dispatch(actions.getMyStudents(classNum)),
        onDeletRequest:(_id,classNum)=>dispatch(actions.delStudent(_id,classNum))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyStuents)
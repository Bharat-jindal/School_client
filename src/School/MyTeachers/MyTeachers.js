import React ,{Component} from 'react';
import {connect} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.css";

import './MyTeachers.css'
import Backdrop from '../../containers/UI/Backdrop/Backdrop';

import * as actions from '../../store/actions/index';
import TeacherEditor from './EditTeacher';
import SetPassword from './SetPAssword';
import AddTeacher from './AddTeacher/AddTeacher';
import Spinner from '../../containers/UI/Spinner/Spinner'

class MyTeachers extends Component{

    state={
        set:false,
        edit:false,
        teacher:null,
        details:false,
        add:false,
        delete:false,
        delClicked:false
    }
    componentDidMount(){
        this.props.getMyTeacher()
    }

    hideBackDrop=()=>{
        this.setState({set:false,edit:false,teacher:null,details:false,add:false,delete:false,delClicked:false})
    }
    showTeacherEditor=(teacher)=>{
        this.setState({edit:true,teacher:teacher})
    }
    showTeacherPasswordSetter=(teacher)=>{
        this.setState({set:true,teacher:teacher})
    }
    showProperties=(teacher)=>{
        this.setState({details:true,teacher:teacher})
    }
    showAddTeacher=()=>{
        this.setState({add:true})
    }
    showDeleteProperties=(teacher)=>{
        this.setState({delete:true,teacher:teacher})
    }
    deleteHandler=()=>{
        this.setState({delClicked:true});
        this.props.onDeletRequest(this.state.teacher._id)
    }

    render(){
    var teachersKeyArray=this.props.teachers;
    var editior=null;
    if(this.state.edit){
        editior=<TeacherEditor 
                    _id={this.state.teacher._id}
                    name={this.state.teacher.name}
                    streat={this.state.teacher.streat}
                    town={this.state.teacher.town}
                    district={this.state.teacher.district}
                    state={this.state.teacher.state}
                    admin={this.state.teacher.admin}
            />
    }
    var set=null;
    if(this.state.set){
        set=<SetPassword _id={this.state.teacher._id} />
    }
    var add=null
    if(this.state.add){
        add=<AddTeacher />
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
        for(let key in this.state.teacher){
            if(key!=='__v' && key !=='_id' && key!=='admin' && key!=='tests')
            formElementArray.push({
                id: key
            })
        }
        properties=(
            <div className="TeacherProperties">
                {
                    formElementArray.map(property=>{
                        return <div key={property.id}>
                            <div key={property.id}><span className="SchoolTitles">{property.id.toUpperCase()}:</span><span>{this.state.teacher[property.id]}</span></div>
                        </div>
                    })
                }
                <div><span className="SchoolTitles">Admin</span>:<span>{this.state.teacher['admin']?'Admin':'Not Admin'}</span></div>
            </div>
        )
        
    }
    

    var teachers=null;
    teachers=teachersKeyArray.map(teacher=>{
        return <div className="TeacherIntro" key={teacher.username}>
            {teacher.name}
            <br />
            <div className="MyTeachersEdit">
                <button onClick={()=>this.showTeacherEditor(teacher)} className="common-form-buttons" style={{marginLeft:"5px",marginRight:"5px"}}>Edit</button>
                <button onClick={()=>this.showTeacherPasswordSetter(teacher)} className="common-form-buttons" style={{marginLeft:"5px",marginRight:"5px"}}>Set Password</button>
                <button onClick={()=>this.showProperties(teacher)} className="common-form-buttons" style={{marginLeft:"5px",marginRight:"5px"}}>Details</button>
                <button onClick={()=>this.showDeleteProperties(teacher)} className="common-form-buttons" style={{marginLeft:"5px",marginRight:"5px"}}>DELETE</button>
            </div>
        </div>
    })
    return (
        <div>
            {this.props.loading?<Spinner />:null}
            {teachers}
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
        loading:state.school.loading,
        teachers:state.school.teachers,
        delError:state.school.teachDelErr,
        delSuccess:state.school.teachDelSuccess
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        getMyTeacher:()=>dispatch(actions.getMyTechers()),
        onDeletRequest:(_id)=>dispatch(actions.delTeacher(_id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyTeachers)
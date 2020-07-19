import React ,{Component} from 'react';
import './StudentSide.css'
import {connect} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.css";

import * as actions from '../../store/actions/index';
import Backdrop from '../../containers/UI/Backdrop/Backdrop';
import Spinner from '../../containers/UI/Spinner/Spinner'

class studentSide extends Component {
    state={
        studId:{
            value:'',
        },
        studClicked:false,
        month:'',
        updateClicked:false,
        updateShow:false,
        feePaidStatus:false
    }
    getStudentHandler=()=>{
        this.setState({studClicked:true})
        this.props.onFeesStatusRequest(this.state.studId.value)
    }

    studentChangeId=(event)=>{
        var updatedStudId={...this.state.studId}
        updatedStudId.value=event.target.value
        this.setState({studId:updatedStudId})
    }

    hideUpdateBox=()=>{
        this.setState({updateShow:false})
    }
    updateBoxHandler=(month)=>{
        this.setState({updateShow:true,month:month})
    }
    submitUpdate=()=>{
        this.setState({updateClicked:true})
        this.props.onUpdateFeeRequest(this.props.stud_id,
            this.state.month,
            this.state.feePaidStatus,
            this.state.studId)
    }
    changeUpdateSelect=(event)=>{
        this.setState({feePaidStatus:event.target.value})
    }
    render(){

        var updateInfo=null;
        if(this.state.updateClicked && this.props.updateError){
            updateInfo=<p>Something Went Wrong</p>
        }
        if(this.state.updateClicked && this.props.updateSuccess){
            updateInfo=<p>Updated successfully</p>
        }
        var updateBox=null;
        if(this.state.updateShow){
            updateBox=<div className="updateFeesBox">
                <select value={this.state.feePaidStatus} onChange={this.changeUpdateSelect} className="UpdateSelect">
                    <option value={true} >PAID</option>
                    <option value={false} >NOT PAID</option>
                </select>
                <br />
                <button onClick={this.submitUpdate} className="common-form-buttons" style={{marginTop:"30px"}}>UPDATE</button>
                {updateInfo}
            </div>
        }
        var info=null;
        if(this.state.studClicked && this.props.studGetError){
            info=<p>Something Went Wrong</p>
        }
        var spinner=null;
        if(this.props.loading){
            spinner=<Spinner />
        }
        var feesArray=this.props.studGet.map((fee,index)=>{
            return <div className="FeeStatusList" key={index}>
                <span style={{paddingRight:'2vw'}}>{fee.month}</span>
                <span style={{paddingRight:'2vw'}}>{fee.amount}</span>
                <span style={{paddingRight:'2vw'}}>{fee.paid? 'PAID':'NOT PAID'}</span>
                <button onClick={this.updateBoxHandler.bind(this,fee.month)}>UPDATE</button>
            </div>
        })

        return(
            <div>
                {spinner}
                <div>
                    <b>STUDENT ID</b>
                    <input value={this.state.studId.value} onChange={this.studentChangeId} className="common-input"/>
                    <button onClick={this.getStudentHandler}>GET FEES</button>
                </div>
                <br />
                <br />
                {feesArray}
                {updateBox}
                {info}
                <br />
                <br />
                <Backdrop show={this.state.updateShow} clicked={this.hideUpdateBox} />
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.fees.studLoading,
        studGet:state.fees.studGet,
        studGetError:state.fees.studGetError,
        updateError:state.fees.updateError,
        updateSuccess:state.fees.updateSuccess,
        stud_id:state.fees.stud_id
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onFeesStatusRequest:(username)=>dispatch(actions.feeStatus(username)),
        onUpdateFeeRequest:(studentId,month,paid,username)=>dispatch(actions.updatingFeeStatus(studentId,month,paid,username))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(studentSide);
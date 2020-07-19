import React ,{Component} from 'react';
import './FeeHome.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import "@fortawesome/fontawesome-free/css/all.css";

import Backdrop from '../../containers/UI/Backdrop/Backdrop';
import AddFee from '../AddFees/AddFees';
import Studentside from '../StudentSide/StudentSide';
import Spinner from '../../containers/UI/Spinner/Spinner';

class FeeHome extends Component {
    state={
        feeSwitch:'Get',
        class:{
            value:''
        },
        feeClicked:false,
        add:false,
        delIndex:null
    }

    changeFeeSwitchHandler=(event)=>{
        this.setState({feeSwitch:event.target.value})
    }
    classChangeHandler=(event)=>{
        const updatedClass={...this.state.class}
        updatedClass.value=event.target.value
        this.setState({class:updatedClass})
    }
    getTheFees=()=>{
        this.setState({feeClicked:true})
        this.props.onGetFeesRquest(this.state.class.value)
    }

    hideBackdrop=()=>{
        this.setState({feeSwitch:'Get'})
    }

    feeDeleteHandler=(month,index)=>{
        this.setState({delIndex:index})
        this.props.onDeleteFeesRequest(month,this.props.classNum)
    }

    render(){
        var fees=this.props.fees.map((fee,index)=>{
            return <div key={index} className="feesList">
                <span style={{paddingRight:'2vw'}}>{fee.month.toUpperCase()}</span>
                <span style={{paddingRight:'2vw'}}>{fee.amount}</span>
                <button onClick={this.feeDeleteHandler.bind(this,fee.month,index)}>DELETE</button>
                <br />
                {(index===this.state.delIndex && this.props.loading)?<Spinner />:null}
                {(index===this.state.delIndex && this.props.deleteError)?<span >Something Went Wrong</span>:null}
                
            </div>
        })
        var feeSwitch=null;
        if(this.state.feeSwitch==='Get'){
            feeSwitch=<div>
                <div>
                    <b>CLASS</b>
                    <input value={this.state.class.value} onChange={this.classChangeHandler} className="common-input"/>
                    <button onClick={this.getTheFees} className="common-form-buttons">GET FEES</button>
                </div>
                <br />
                <br />
                {fees}
            </div>
        }
        if(this.state.feeSwitch==='Add'){
            feeSwitch=<AddFee />
        }
        return <div>
            <div className="StudentSide">
                    <Studentside />
            </div>
            <div className="FeeSwitch">
                <select value={this.state.feeSwitch} onChange={this.changeFeeSwitchHandler} className="FeeSelect">
                    <option value='Add' >ADD</option>
                    <option value='Get' >GET</option>
                </select>
                {feeSwitch}
                {this.props.loading && this.state.feeClicked ?<Spinner />:null}
                <Backdrop show={this.state.feeSwitch==='Add'} clicked={this.hideBackdrop} />
                </div>                
        </div>
    }
}

const mapStateToProps=(state)=>{
    return {
        loading:state.fees.loading,
        loadingErr:state.fees.loadingErr,
        fees:state.fees.fees,
        deleteError:state.fees.deleteError,
        deleteSuccess:state.fees.deleteSuccess,
        classNum:state.fees.classNum
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onGetFeesRquest:(classNum)=>dispatch(actions.getMyfees(classNum)),
        onDeleteFeesRequest:(classNum,month)=>dispatch(actions.deletingFees(classNum,month))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FeeHome)
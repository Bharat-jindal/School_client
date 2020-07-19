import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import './Properties.css';
import Spinner from '../../containers/UI/Spinner/Spinner'

class GetFees extends Component {

    componentDidMount(){
        this.props.onGetFeesRequest(this.props.id)
    }
    render(){
        var fees=this.props.fees.map((fee,index)=>{
            return <div key={index} className="StudentPropertiesList">
                <span style={{paddingRight:'2vw'}}>{fee.month.toUpperCase()}</span>
                <span style={{paddingRight:'2vw'}}>{fee.amount}</span>
                <span>{fee.paid?'PAID':'PENDING'}</span>
            </div>
        })
        return <div>
            {this.props.loading?<Spinner />:null}
            {this.props.error?<h2 style={{color:'#ff9900'}}>Something Went Wrong</h2>:null}
            {fees}
        </div>
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.student.loading,
        fees:state.student.fees,
        error:state.student.error,
        id:state.auth.user._id
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onGetFeesRequest:(id)=>dispatch(actions.getStudentProppertyFees(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GetFees)
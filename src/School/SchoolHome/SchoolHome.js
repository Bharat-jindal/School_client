import React ,{Component} from 'react';
import {connect} from 'react-redux'

import './SchoolHome.css';
import Backdrop from '../../containers/UI/Backdrop/Backdrop';
import EditProperties from '../EditProperties/EditProperties';
import ChangePassword from '../Passwords/changePassword';

class Home extends Component {
    state={
        Edit:false,
        password:false
    }
    removeEditHandler=()=>{
        this.setState({Edit:false,password:false})
    }
    editHandler=()=>{
        this.setState({Edit:true})
    }
    passwordHandler=()=>{
        this.setState({password:true})
    }

    render(){
        var editProperties=null;
        if(this.state.Edit){
            editProperties=<EditProperties 
            name={this.props.user.name}
            town={this.props.user.town}
            district={this.props.user.district}
            state={this.props.user.state}
            streat={this.props.user.streat}
            />
        }
        var changePassword=null;
        if(this.state.password){
            changePassword=<ChangePassword rol='school' />
        }
        let formElementArray=[];
        for(let key in this.props.user){
            if(key!=='__v' && key !=='_id')
            formElementArray.push({
                id: key
            })
        }

        var properties=formElementArray.map(property=>{
            return <div key={property.id}>
                <div key={property.id}>
                    <span className="common-form-keys">{property.id.toUpperCase()}:</span>
                    <span>{this.props.user[property.id]}</span>
                </div>
            </div>
        })
        return (
            <div>
                <div>
                    <div className="common-form-display">
                        {properties}
                        
                        <button className="common-form-buttons" style={{marginTop:"30px",marginRight:"30px"}} onClick={this.editHandler}>Edit</button>
                        <button className="common-form-buttons" onClick={this.passwordHandler}>CHANGE PASSWORD</button>
                    </div>
                </div>
                {changePassword}
                {editProperties}
                <Backdrop show={this.state.Edit || this.state.password} clicked={this.removeEditHandler}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated:state.auth.idToken !==null,
      role:state.auth.role,
      user:state.auth.user,
      token:state.auth.idToken
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }

export default  (connect(mapStateToProps,mapDispatchToProps)(Home));;
import React ,{Component} from 'react';
import {connect} from 'react-redux';
import './StudentHome.css';


import Backdrop from '../../containers/UI/Backdrop/Backdrop';
import ChangePassword from '../../School/Passwords/changePassword';

class Home extends Component {
    state={
        password:false
    }
    removeEditHandler=()=>{
        this.setState({password:false})
    }
    passwordHandler=()=>{
        this.setState({password:true})
    }

    render(){
        var changePassword=null;
        if(this.state.password){
            changePassword=<ChangePassword rol='student' />
        }
        let formElementArray=[];
        for(let key in this.props.user){
            if(key!=='__v' && key !=='_id' && key!=='tests'  && key!=='books' && key !=='fees' && key!=='schoolname')
            formElementArray.push({
                id: key
            })
        }

        var properties=formElementArray.map(property=>{
            return <div key={property.id}>
                <div key={property.id}><span className="SchoolTitles">{property.id}</span>:<span>{this.props.user[property.id]}</span></div>
            </div>
        })
        return (
            <div>
                <div>
                    <div className="StudentProperties">
                        {properties}
                        <button className="StudentPropertiesEditButton" onClick={this.passwordHandler}>CHANGE PASSWORD</button>
                    </div>
                </div>
                {changePassword}
                <Backdrop show={this.state.password} clicked={this.removeEditHandler}/>
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
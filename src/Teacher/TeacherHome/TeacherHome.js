import React ,{Component} from 'react';
import {connect} from 'react-redux';
import './TeacherHome.css';
import "@fortawesome/fontawesome-free/css/all.css";


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
        var spinner=null;
        if(this.props.loading){
            spinner=<span className="fa fa-spinner"></span>
        }
        var changePassword=null;
        if(this.state.password){
            changePassword=<ChangePassword rol='teacher' />
        }
        let formElementArray=[];
        for(let key in this.props.user){
            if(key!=='__v' && key !=='_id' && key!=='admin' && key!=='tests'  && key!=='schoolname')
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
                {spinner}
                <div>
                    <div className="SchoolProperties">
                        {properties}
                        <button className="SchoolPropertiesEditButton" onClick={this.passwordHandler}>CHANGE PASSWORD</button>
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
      token:state.auth.idToken,
      loading:state.teacher.loading
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }

export default  (connect(mapStateToProps,mapDispatchToProps)(Home));;
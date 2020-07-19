import React ,{Component} from 'react';
import './LoginPage.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {connect} from 'react-redux'

import HomeImage from '../../assets/smart-home.png';
import Signup from '../SignupPage/SignupPage';
import BackDrop from '../UI/Backdrop/Backdrop';
import * as actions from '../../store/actions/index';
import LoginBox from '../LoginBox/LoginBox';
import SetPassword from '../../School/Passwords/setPassword';

class LoginPage extends Component{
    state={
        Signup:false,
        Login:false,
        role:'',
        setPassword:false
    }

    hideSignupLoginHandler=()=>{
        this.setState({Signup:false,Login:false,setPassword:false,sisnupMessage:false})
    }
    showSignUpHandler=()=>{
        this.setState({Signup:true})
    }
    showLoginPageHAndler=(role)=>{
        this.setState({Login:true,role:role})
    }
    setPasswordHandler=()=>{
        this.setState({setPassword:true})
    }

    render(){
        var signup=null;
        var spinner=null;
        var error=null;
        var setPassword=null;
        if(this.state.setPassword){
            setPassword=<SetPassword />
        }
        if(this.props.loading){
            spinner=<i className="fas fa-spinner Loader" ></i>
        }
        if(this.props.error!==null){
            error='Enter correct Credentials'
        }
        if(this.state.Signup && !this.props.signup){
            signup=(
                <Signup clicked={(fields)=>this.props.onSignupRequest(fields)} error={error}/>
            )
        }
        var login=null;
        if(this.state.Login){
            login=(
                <LoginBox role={this.state.role} 
                setClicked={this.setPasswordHandler}
                clicked={(username,password)=>this.props.onloginRequest(username,password,this.state.role)} error={error}
                loading={this.props.loading}/>
            )
        }
        return(
            <div className="Home">
                <div className="HomeTop"><img src={HomeImage} className="HomeImage" alt="My_smart_school"/></div>
                <div className="HomeMessage">
                    Welcome to The <br />
                    My Smart School
                </div>
                <div className="LoginTable">
                    <div className="LoginCards" onClick={()=>this.showLoginPageHAndler('school')}>
                        <span className="fa fa-university HomeIcons" onClick={()=>this.props.onloginRequest()}></span>
                        <p>Login As School</p>
                    </div>
                    <div className="LoginCards" onClick={()=>this.showLoginPageHAndler('teacher')}>
                        <span className="fa fa-book-reader HomeIcons" />
                        <p>Login As Teacher</p>
                    </div>
                    <div className="LoginCards" onClick={()=>this.showLoginPageHAndler('student')}>
                        <span className="fa fa-user-graduate HomeIcons" />
                        <p>Login As Student</p>
                    </div>
                </div>
                <div className="SignupMessage">
                    <p>New School?
                        <br />
                        Join the Most Smart School Networks
                    </p>
                    <button className="SignupPageOpener" onClick={this.showSignUpHandler}>SIGNUP</button>
                </div>
                <BackDrop show={(this.state.Signup||this.state.Login)} clicked={this.hideSignupLoginHandler}/>
                {signup}
                {login}
                {spinner}
                {this.props.signup?<h1 style={{float:"top",top:"20px"}}>You are signedUp ,Please Login</h1>:null}
                {setPassword}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated:state.auth.idToken !==null,
      loading:state.auth.loading,
      error:state.auth.error,
      signup:state.auth.signup
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onloginRequest : (username,password,role) => dispatch(actions.authentication(username,password,role)),
      onSignupRequest:(fields)=>dispatch(actions.signUpSchool(fields))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)
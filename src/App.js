import React ,{Component} from 'react';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.css";
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Logout from './containers/Logout/Logout';
import asyncComponent from './asyncComponent/asyncComponent';
import Layout from './containers/Layout/Layout';


const asyncLogin=asyncComponent(()=>{
  return import('./containers/LoginPage/LoginPage')
});
const asyncSchoolHome=asyncComponent(()=>{
  return import('./School/SchoolHome/SchoolHome')
});
const asyncTeacherHome =asyncComponent(()=>{
  return import ('./Teacher/TeacherHome/TeacherHome')
});
const asyncStudentHome =asyncComponent(()=>{
  return import ('./Student/StudentHome/StudentHome')
})
const asyncMyTeachers=asyncComponent(()=>{
  return import ('./School/MyTeachers/MyTeachers')
})
const asyncMyStudents=asyncComponent(()=>{
  return import('./Teacher/MyStudents/MyStudents')
})
const asyncMyTasks=asyncComponent(()=>{
  return import ('./Teacher/Tasks/Mytasks/Mytasks')
})
const asyncFeeHome=asyncComponent(()=>{
  return import ('./Fees/FeeHome/FeeHome')
})
const asyncBookHome=asyncComponent(()=>{
  return import ('./Books/BookHome/BookHome')
})

const asyncStudentFee=asyncComponent(()=>{
  return import ('./Student/Properties/Fees')
})
const asyncStudentTask=asyncComponent(()=>{
  return import ('./Student/Properties/Tasks')
})
const asyncStudentBook=asyncComponent(()=>{
  return import ('./Student/Properties/Books')
})

class App extends Component{
  componentDidMount() {
    this.props.onAutoSignUp()
  }
  render(){
    console.log(this.props.user)
    let routes = (
      <Switch>
            <Route path="/" exact component={asyncLogin} />
            <Redirect to="/" />
          </Switch>
    )

    if(this.props.isAuthenticated && this.props.role==='school'){
      routes=(
        <Switch>
            <Route path="/" exact component={asyncSchoolHome} />
            <Route path="/logout" component={Logout} />
            <Route path="/teachers" component={asyncMyTeachers} />
            <Redirect to="/" />
          </Switch>
      )
    }

    if(this.props.isAuthenticated && this.props.role==='teacher'){
      routes=(
        <Switch>
            <Route path="/" exact component={asyncTeacherHome} />
            <Route path="/student" component={asyncMyStudents} />
            <Route path="/tasks" component={asyncMyTasks} />
            <Route path="/fees" component={asyncFeeHome} />
            <Route path="/library" component={asyncBookHome} />
            <Route path="/logout" component={Logout} />
          </Switch>
      )
    }

    if(this.props.isAuthenticated && this.props.role==='student'){
      routes=(
        <Switch>
            <Route path="/" exact component={asyncStudentHome} />
            <Route path="/books" component={asyncStudentBook} />
            <Route path="/myFees" component={asyncStudentFee} />
            <Route path="/myTasks" component={asyncStudentTask} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
          </Switch>
      )
    }
    return (
      <div className="App">
        <Layout role={this.props.role} user={this.props.user}>
          {routes}
        </Layout>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated:state.auth.idToken !==null,
    role:state.auth.role,
    user:state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

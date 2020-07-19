import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
};

const authSuccess= (idToken,user,role) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        user:user,
        role:role
    }
};

const authFail = () => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:true
    }
};

const signupSuccess =()=>{
    return {
        type:actionTypes.SIGN_SUCCESS
    }
}

const schoolupdateSuccess=(user)=>{
    return {
        type:actionTypes.UPDATE_SCHOOL,
        user:user
    }
}

export const authLogout = () => {
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('idToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            return dispatch(authLogout())
        },expirationTime)
    }
}

export const authentication = (username,password,role) => {
    return dispatch => {
        dispatch(authStart());
        const reqPayload={   username:username,
	            password:password,
        }
        axios({url:`/${role}/login`,method:'post',data:reqPayload})
        .then(response=> {
            const expirationTime=new Date(new Date().getTime()+36000000);
            localStorage.setItem('idToken',response.data.token);
            localStorage.setItem('expirationTime',expirationTime);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            localStorage.setItem('role',role);
            dispatch(checkAuthTimeOut(36000000))
            return dispatch(authSuccess(response.data.idToken,response.data.user,role))
        })
        .catch(err =>{
            return dispatch(authFail())
        })
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    return dispatch => {
       const idToken = localStorage.getItem('idToken')
       if(!idToken){
        return dispatch(authLogout())
       }else{
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if(expirationTime < new Date()){
            return dispatch(authLogout())
        }else{
            const user=JSON.parse(localStorage.getItem('user'))
            dispatch(authSuccess(idToken,user,localStorage.getItem('role')))
            return dispatch(checkAuthTimeOut((expirationTime.getTime()-new Date().getTime())))
        }
       }
    }
}

export const signUpSchool=(fields)=>{
    return dispatch => {
        dispatch(authStart());
        const reqPayload={   username:fields.username.value,
            password:fields.password.value,
            town:fields.town.value,
            state:fields.state.value,
            name:fields.name.value,
            streat:fields.street.value,
            district:fields.district.value,
            uniquepass:fields.ProductKey.value
        }
        axios({url:`/school/signup`,method:'post',data:reqPayload})
        .then(response=> {
            return dispatch(signupSuccess())
        })
        .catch(err =>{
            return dispatch(authFail())
        })
    }
}

export const updateSchool=(name,streat,town,district,state)=>{
    return dispatch => {
        dispatch(authStart());
        const reqPayload={   
            name:name,
            streat:streat,
            town:town,
            district:district,
            state:state,
        }
        axios({url:`/school`,method:'put',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            
            localStorage.setItem('user',JSON.stringify(response.data));
            return dispatch(schoolupdateSuccess(response.data))
        })
        .catch(err =>{
            return dispatch(authFail())
        })
    }
}


export const updateStudent=(name,streat,town,district,state)=>{
    return dispatch => {
        dispatch(authStart());
        const reqPayload={   
            name:name,
            streat:streat,
            town:town,
            district:district,
            state:state,
        }
        axios({url:`/school`,method:'put',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            
            localStorage.setItem('user',JSON.stringify(response.data));
            return dispatch(schoolupdateSuccess(response.data))
        })
        .catch(err =>{
            return dispatch(authFail())
        })
    }
}
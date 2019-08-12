import updateObject from '../../utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState ={
    idToken:null,
    user: null,
    loading: false,
    error: null,
    redirectPath: '/',
    role:null,
    signup:false,
    updated:false,
}

const authStart = (state,action) => {
    return updateObject(state,{loading: true,error: null})
}
const authSuccess = (state,action) => {
    return updateObject(state,{
        idToken:action.idToken,
        user: action.user,
        loading:false,
        error: null,
        role:action.role,
    })
}
const authFail = (state,action) => {
    return updateObject(state,{
        loading: false,
        error: action.error
    })
}
const authLogout = (state,action) => {
    return updateObject(state,{
        idToken:null,
        user:null,
        role:null,
    })
}
const setRedirectPath = (state,action) => {
    return updateObject(state,{redirectPath:action.path})
}
const signupSuccess=(state,action)=>{
    return updateObject(state,{signup:true,loading:false,error:null})
}
const updateSchool=(state,action)=>{
    return updateObject(state,{user:action.user,updated:true,loading:false,
        error: null,})
}




const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.AUTH_START : return authStart(state,action)
        case actionTypes.AUTH_SUCCESS : return authSuccess(state,action)
        case actionTypes.AUTH_FAIL: return authFail(state,action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setRedirectPath(state,action)
        case actionTypes.SIGN_SUCCESS:return signupSuccess(state,action)
        case actionTypes.UPDATE_SCHOOL:return updateSchool(state,action)

        
        default: return state
    }
}

export default reducer
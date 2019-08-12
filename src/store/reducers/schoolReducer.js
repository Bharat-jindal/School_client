import updateObject from '../../utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState ={
    teachers:[],
    loading: false,
    teacherError: null,
    teacherUpdateError:false,
    teacherUpdated:false,
    teacher:null,
    teachDelErr:false,
    teachDelSuccess:false
}

const loadingStart = (state,action) => {
    return updateObject(state,{loading: true,teacherError: null})
}
const getMyTeachers = (state,action) => {
    console.log(action.teachers)
    return updateObject(state,{
        teachers:action.teachers,
        loading:false,
        teacherError: null,
    })
}
const loadingTecherFail = (state,action) => {
    return updateObject(state,{
        loading: false,
        teacherError: true,
        
        teacherUpdateError:false,
        teacherUpdated:false
    })
}

const teacherUpdateStart=(state,action)=>{
    return updateObject(state,{teacherUpdateError:false,teacherUpdated:false,loading:true,teacher:null})
}
const teacherUpdated=(state,action)=>{
    return updateObject(state,{teacherUpdateError:false,teacherUpdated:true,loading:false})
}
const teacherUpdateError=(state,action)=>{
    return updateObject(state,{teacherUpdateError:true,teacherUpdated:false,loading:false,teacher:null})
}

const addTeacherSuccess=(state,action)=>{
    return updateObject(state,{teacherUpdateError:false,teacherUpdated:true,loading:false,teacher:action.teacher})
}

const teacherDeleteStart=(state,action)=>{
    return updateObject(state,{teachDelErr:false,teachDelSuccess:false,loading:true})
}
const teacherDeleteSuccess=(state,action)=>{
    return updateObject(state,{teachDelErr:false,teachDelSuccess:true,loading:false})
}
const teacherDeleteFail=(state,action)=>{
    return updateObject(state,{teachDelErr:true,teachDelSuccess:false,loading:false})
}

const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.MYTEACHER_LOADING_START : return loadingStart(state,action)
        case actionTypes.STORE_MYTEACHERS : return getMyTeachers(state,action)
        case actionTypes.LOADING_MYTEACHER_FAIL: return loadingTecherFail(state,action)

        case actionTypes.TEACHER_UPDATED_START:return teacherUpdateStart(state,action)
        case actionTypes.TEACHER_UPDATED:return teacherUpdated(state,action)
        case actionTypes.TEACHER_UPDATED_ERROR:return teacherUpdateError(state,action)

        case actionTypes.ADD_TEACHER_SUCCESS:return addTeacherSuccess(state,action)

        case actionTypes.TEACHER_DELETE_START:return teacherDeleteStart(state,action)
        case actionTypes.TEACHER_DELETE_SUCCESS:return teacherDeleteSuccess(state,action)
        case actionTypes.TEACHER_DELET_FAIL:return teacherDeleteFail(state,action)

        case actionTypes.AUTH_LOGOUT:return initialState
        
        default: return state
    }
}

export default reducer
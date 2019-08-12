import updateObject from '../../utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState ={
    students:[],
    loading: false,
    studentError: null,
    studentUpdateError:false,
    studentUpdated:false,
    student:null,
    studDelErr:false,
    studDelSuccess:false,
    tasks:[],
    task:null
}

const loadingStart = (state,action) => {
    return updateObject(state,{loading: true,studentError: null})
}
const getMyTstudent = (state,action) => {
    return updateObject(state,{
        students:action.Students,
        loading:false,
        studentError: null,
    })
}

const loadinstudentFail = (state,action) => {
    return updateObject(state,{
        loading: false,
        studentError: true,
        studentUpdated:false
    })
}

const studentUpdateStart=(state,action)=>{
    return updateObject(state,{studentUpdateError:false,studentUpdated:false,loading:true,student:null,task:null})
}
const studentUpdated=(state,action)=>{
    return updateObject(state,{studentUpdateError:false,studentUpdated:true,loading:false})
}
const studentUpdateError=(state,action)=>{
    return updateObject(state,{studentUpdateError:true,studentUpdated:false,loading:false,student:null,task:null})
}

const addstudentSuccess=(state,action)=>{
    return updateObject(state,{studentUpdateError:false,studentUpdated:true,loading:false,student:action.student})
}

const studentDeleteStart=(state,action)=>{
    return updateObject(state,{studDelErr:false,studDelSuccess:false,loading:true})
}
const studentDeleteSuccess=(state,action)=>{
    return updateObject(state,{studDelErr:false,studDelSuccess:true,loading:false})
}
const studentDeleteFail=(state,action)=>{
    return updateObject(state,{studDelErr:true,studDelSuccess:false,loading:false})
}

const addTaskSuccess=(state,action)=>{
    return updateObject(state,{studentUpdateError:false,studentUpdated:true,loading:false,task:action.task})
}

const getMyTasks = (state,action) => {
    return updateObject(state,{
        tasks:action.tasks,
        loading:false,
        studentError: null,
    })
}

const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.MYSTUDENT_LOADING_START : return loadingStart(state,action)
        case actionTypes.STORE_MYSTUDENTS : return getMyTstudent(state,action)
        case actionTypes.LOADING_MYSTUDENT_FAIL: return loadinstudentFail(state,action)

        case actionTypes.STUDENT_UPDATED_START:return studentUpdateStart(state,action)
        case actionTypes.STUDENT_UPDATED:return studentUpdated(state,action)
        case actionTypes.STUDENT_UPDATED_ERROR:return studentUpdateError(state,action)

        case actionTypes.ADD_STUDENT_SUCCESS:return addstudentSuccess(state,action)

        case actionTypes.STUDENT_DELETE_START:return studentDeleteStart(state,action)
        case actionTypes.STUDENT_DELETE_SUCCESS:return studentDeleteSuccess(state,action)
        case actionTypes.STUDENT_DELETE_FAIL:return studentDeleteFail(state,action)

        case actionTypes.STORE_TASKS_TEACHER:return getMyTasks(state,action)
        case actionTypes.ADD_TASK_SUCCESS:return addTaskSuccess(state,action)

        case actionTypes.AUTH_LOGOUT:return initialState
        
        default: return state
    }
}

export default reducer
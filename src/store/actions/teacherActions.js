import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

const loadingStart=()=>{
    return {
        type:actionTypes.MYSTUDENT_LOADING_START
    }
}

const storeStudents=(Students)=>{
    return {
        type:actionTypes.STORE_MYSTUDENTS,
        Students:Students,
    }
}

const loadinStudentsFail=()=>{
    return{
        type:actionTypes.LOADING_MYSTUDENT_FAIL
    }
}

export const getMyStudents=(classNum)=>{
    return dispatch=>{
        dispatch(loadingStart())
        axios({url:`/student/get`,method:'post',
        data:{
            class:classNum
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(student=>{
        if(student!==null){
            dispatch(storeStudents(student.data))
        }
        return
    })
    .catch(err=>{
        return dispatch(loadinStudentsFail())
    })
    }
}

const studentUpdateStart=()=>{
    return {type:actionTypes.STUDENT_UPDATED_START}
}
const studentUpdated =() =>{
    return {type:actionTypes.STUDENT_UPDATED}
}
const studentUpdatedError = () =>{
    return {type:actionTypes.STUDENT_UPDATED_ERROR}
}

export const updateStudent=(_id,name,streat,town,district,state,fathername,mothername,classNum)=>{
    return dispatch => {
        dispatch(studentUpdateStart())
        const reqPayload={   
            _id:_id,
            name:name,
            streat:streat,
            town:town,
            district:district,
            state:state,
            fathername,
            mothername
        }
        axios({url:`/student`,method:'put',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            dispatch(studentUpdated())
            return dispatch(getMyStudents(classNum))
        })
        .catch(err =>{
            return dispatch(studentUpdatedError())
        })
    }
}

export const setStudentPassword=(_id,password)=>{
    return dispatch => {
        dispatch(studentUpdateStart())
        const reqPayload={   
            newPassword:password
        }
        axios({url:`/student/setPassword/${_id}`,method:'post',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            return dispatch(studentUpdated())
        })
        .catch(err =>{
            return dispatch(studentUpdatedError())
        })
    }
}

const newStudentAdded =(student)=>{
return {
    type:actionTypes.ADD_STUDENT_SUCCESS,
    student
}
}

export const addStudent=(password,name,streat,town,district,state,fathername,mothername,classNum,rollno)=>{
    return dispatch => {
        dispatch(studentUpdateStart());
        const reqPayload={   
            password,name,streat,town,district,state,class:classNum,fathername,mothername,rollno
        }
        axios({url:`/student/signup`,method:'post',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            dispatch(newStudentAdded(response.data.student))
            return dispatch(getMyStudents(classNum))
        })
        .catch(err =>{
            return dispatch(studentUpdatedError())
        })
    }
}

const studentDeleteStart=()=>{
    return {type:actionTypes.STUDENT_DELETE_START}
}
const studentDeleteSuccess=()=>{
    return {type:actionTypes.STUDENT_DELETE_SUCCESS}
}
const studentDeleteFail=()=>{
    return {type:actionTypes.STUDENT_DELETE_FAIL}
}
export const delStudent=(_id,classNum)=>{
    return dispatch => {
        dispatch(studentDeleteStart());
        axios({url:`/student/${_id}`,method:'delete',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
             dispatch(studentDeleteSuccess())
             return dispatch(getMyStudents(classNum))
        })
        .catch(err =>{
            return dispatch(studentDeleteFail())
        })
    }
}

const storeTasks=(tasks)=>{
    return {
        type:actionTypes.STORE_TASKS_TEACHER,
        tasks
    }
}

export const getMyTasks=()=>{
    return dispatch=>{
        dispatch(loadingStart())
        axios({url:`/tasks/teacher`,method:'get',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(task=>{
        if(task!==null){
            dispatch(storeTasks(task.data))
        }
        return
    })
    .catch(err=>{
        return dispatch(loadinStudentsFail())
    })
    }
}

export const delTask=(_id)=>{
    return dispatch => {
        dispatch(studentDeleteStart());
        axios({url:`/tasks/teacher/${_id}`,method:'delete',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
             dispatch(studentDeleteSuccess())
             return dispatch(getMyTasks())
        })
        .catch(err =>{
            return dispatch(studentDeleteFail())
        })
    }
}

const newTaskAdded =(task)=>{
    return {
        type:actionTypes.ADD_TASK_SUCCESS,
        task
    }
    }

export const addTask=(title,classNum,contents)=>{
    return dispatch => {
        dispatch(studentUpdateStart());
        const reqPayload={  
            title,
            class:[parseInt(classNum)],
            contents
        }
        axios({url:`/tasks/teacher`,method:'post',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            dispatch(newTaskAdded(response.data.task))
            return dispatch(getMyTasks())
        })
        .catch(err =>{
            return dispatch(studentUpdatedError())
        })
    }
}






import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

const loadingStart=()=>{
    return {
        type:actionTypes.MYTEACHER_LOADING_START
    }
}

const storeTeachers=(teachers)=>{
    return {
        type:actionTypes.STORE_MYTEACHERS,
        teachers:teachers,
    }
}

const loadingTeachersFail=()=>{
    return{
        type:actionTypes.LOADING_MYTEACHER_FAIL
    }
}

export const getMyTechers=()=>{
    return dispatch=>{
        dispatch(loadingStart())
        axios({url:`/teacher`,method:'get',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(teacher=>{
        console.log(teacher.data)
        if(teacher!==null){
            dispatch(storeTeachers(teacher.data))
        }
        return
    })
    .catch(err=>{
        dispatch(loadingTeachersFail())
    })
    }
}

const teacherUpdateStart=()=>{
    return {type:actionTypes.TEACHER_UPDATED_START}
}
const teacherUpdated =() =>{
    return {type:actionTypes.TEACHER_UPDATED}
}
const teacherUpdatedError = () =>{
    return {type:actionTypes.TEACHER_UPDATED_ERROR}
}

export const updateTeacher=(_id,name,streat,town,district,state,admin)=>{
    return dispatch => {
        dispatch(teacherUpdateStart())
        const reqPayload={   
            _id:_id,
            name:name,
            streat:streat,
            town:town,
            district:district,
            state:state,
            admin:admin
        }
        axios({url:`/teacher`,method:'put',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            dispatch(teacherUpdated())
            return dispatch(getMyTechers())
        })
        .catch(err =>{
            return dispatch(teacherUpdatedError())
        })
    }
}

export const setTeacherPassword=(_id,password)=>{
    return dispatch => {
        dispatch(teacherUpdateStart())
        const reqPayload={   
            newPassword:password
        }
        axios({url:`/teacher/setPassword/${_id}`,method:'post',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            return dispatch(teacherUpdated())
        })
        .catch(err =>{
            return dispatch(teacherUpdatedError())
        })
    }
}

const newTeacherAdded =(teacher)=>{
return {
    type:actionTypes.ADD_TEACHER_SUCCESS,
    teacher
}
}

export const addTeacher=(username,password,name,streat,town,district,state)=>{
    return dispatch => {
        dispatch(teacherUpdateStart());
        const reqPayload={   
            username,password,name,streat,town,district,state
        }
        axios({url:`/teacher/signup`,method:'post',data:reqPayload,
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
            dispatch(newTeacherAdded(response.data.teacher))
            return dispatch(getMyTechers())
        })
        .catch(err =>{
            return dispatch(teacherUpdatedError())
        })
    }
}

const teacherDeleteStart=()=>{
    return {type:actionTypes.TEACHER_DELETE_START}
}
const teacherDeleteSuccess=()=>{
    return {type:actionTypes.TEACHER_DELETE_SUCCESS}
}
const teacherDeleteFail=()=>{
    return {type:actionTypes.TEACHER_DELET_FAIL}
}
export const delTeacher=(_id)=>{
    return dispatch => {
        dispatch(teacherDeleteStart());
        axios({url:`/teacher/${_id}`,method:'delete',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
        .then(response=> {
             dispatch(teacherDeleteSuccess())
             return dispatch(getMyTechers())
        })
        .catch(err =>{
            return dispatch(teacherDeleteFail())
        })
    }
}

export const setSchoolPassword=(password,uniquePassChange,schoolcode)=>{
    return dispatch => {
        dispatch(teacherUpdateStart())
        const reqPayload={   
            newPassword:password,
            uniquePassChange,
            schoolcode:schoolcode
        }
        axios({url:`/school/setPassword`,method:'post',data:reqPayload,})
        .then(response=> {
            return dispatch(teacherUpdated())
        })
        .catch(err =>{
            return dispatch(teacherUpdatedError())
        })
    }
}

export const changePassword=(oldPassword,newPassword,role)=>{
    return dispatch => {
        dispatch(teacherUpdateStart())
        const reqPayload={   
            oldPassword,
            newPassword
        }
        axios({url:`/${role}/changePassword`,method:'post',data:reqPayload,
        headers:{
            'Authorization':`bearer ${localStorage.getItem('idToken')}`
        }})
        .then(response=> {
            return dispatch(teacherUpdated())
        })
        .catch(err =>{
            return dispatch(teacherUpdatedError())
        })
    }
}






import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

const loadingStart=()=>{
    return {
        type:actionTypes.STUDENT_PROPERTY_LOADING_START
    }
}

const storeBooks=(books)=>{
    return {
        type:actionTypes.STUDENT_STORE_BOOKS,
        books,
    }
}

const storeFees=(fees)=>{
    return {
        type:actionTypes.STUDENT_STORE_FEES,
        fees
    }
}

const storeTasks=(tasks)=>{
    return {
        type:actionTypes.STUDENT_STIRE_TASKS,
        tasks
    }
}
const loadingFail=()=>{
    return{
        type:actionTypes.STUDENT_PROPERTY_LOADING_ERROR
    }
}

export const getStudentProppertyFees=(id)=>{
    return dispatch=>{
        dispatch(loadingStart())
        axios({url:`/fees/${id}`,method:'get',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(student=>{
        if(student!==null){
            dispatch(storeFees(student.data.fees))
        }
        return
    })
    .catch(err=>{
        return dispatch(loadingFail())
    })
    }
}

export const getStudentProppertyTasks=(id)=>{
    return dispatch=>{
        dispatch(loadingStart())
        axios({url:`/tasks/student`,method:'get',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(student=>{
        if(student!==null){
            dispatch(storeTasks(student.data))
        }
        return
    })
    .catch(err=>{
        return dispatch(loadingFail())
    })
    }
}

export const getStudentPropertyBooks=()=>{
    return dispatch=>{
        dispatch(loadingStart())
        axios({url:`/student/books`,method:'get',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(student=>{
        if(student!==null){
            dispatch(storeBooks(student.data.books))
        }
        return
    })
    .catch(err=>{
        return dispatch(loadingFail())
    })
    }
}
import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

const loadingStart=()=>{
    return {
        type:actionTypes.FEE_LOADING_START
    }
}

const storeFees=(fees,classNum)=>{
    return {
        type:actionTypes.FEE_LOADING_SUCCESS,
        fees:fees,
        classNum
    }
}

const loadingFeesFail=()=>{
    return{
        type:actionTypes.FEE_LOADING_ERROR
    }
}

export const getMyfees=(classNum)=>{
    return dispatch=>{
        dispatch(loadingStart())
        axios({url:`/fees/get`,method:'post',
        data:{
            class:classNum
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(fees=>{
        if(fees!==null){
            dispatch(storeFees(fees.data.fees.fees,classNum))
        }
        return loadingFeesFail()
    })
    .catch(err=>{
        return dispatch(loadingFeesFail())
    })
    }
}

const addStart=()=>{
    return {
        type:actionTypes.FEE_ADD_START
    }
}

const addFeesSuccess=()=>{
    return {
        type:actionTypes.FEE_ADD_SUCCESS,
    }
}

const addFeesFail=()=>{
    return{
        type:actionTypes.FEE_ADD_ERROR
    }
}

export const addFees=(fields)=>{
    console.log(fields)
    return dispatch=>{
        dispatch(addStart())
        axios({url:`/fees`,method:'post',
        data:{
            class:fields.class.value,
            fee:{month:fields.month.value,
            amount:fields.amount.value}
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(fees=>{
        if(fees!==null){
            console.log(fees)
            dispatch(addFeesSuccess())
            return dispatch(getMyfees(fields.class.value))
        }
        return addFeesFail()
    })
    .catch(err=>{
        return dispatch(addFeesFail())
    })
    }
}

const deletingStart=()=>{
    return {
        type:actionTypes.FEE_DELETE_START
    }
}

const deletingFeesSuccess=(fees)=>{
    return {
        type:actionTypes.FEE_DELETE_SUCCESS,
        fees:fees,
    }
}

const deletingFail=()=>{
    return{
        type:actionTypes.FEE_DELETE_ERROR
    }
}

export const deletingFees=(month,classNum)=>{
    return dispatch=>{
        dispatch(deletingStart())
        axios({url:`/fees`,method:'delete',
        data:{
            fee:{month},
            class:classNum
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(fees=>{
        if(fees!==null){
            dispatch(getMyfees(classNum))
            dispatch(deletingFeesSuccess(fees.data.fees))
        }
        return deletingFail()
    })
    .catch(err=>{
        return dispatch(deletingFail())
    })
    }
}

const gettingFeeStatus=()=>{
    return {
        type:actionTypes.GETTING_FEES_START
    }
}

const gettingFeeStatusSuccess=(fees,_id)=>{
    return {
        type:actionTypes.GETTING_FEES_SUCCESS,
        fees:fees,
        _id:_id
    }
}

const gettingFeeStatusFail=()=>{
    return{
        type:actionTypes.GETTING_FEES_ERROR
    }
}

export const feeStatus=(username)=>{
    return dispatch=>{
        dispatch(gettingFeeStatus())
        axios({url:`/fees/student`,method:'post',
        data:{username
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(response=>{
        console.log(response)
        if(response!==null){
            return dispatch(gettingFeeStatusSuccess(response.data.fees,response.data._id))
        }
        return gettingFeeStatusFail()
    })
    .catch(err=>{
        return dispatch(gettingFeeStatusFail())
    })
    }
}

const updatingFeeStatusStart=()=>{
    return {
        type:actionTypes.UPDATING_FEES_START
    }
}

const updatingFeeStatusSuccess=()=>{
    return {
        type:actionTypes.UPDATING_FEES_SUCCESS,
    }
}

const updatingFeeStatusFail=()=>{
    return{
        type:actionTypes.UPDATING_FEES_ERROR
    }
}

export const updatingFeeStatus=(studentId,month,paid,username)=>{
    return dispatch=>{
        dispatch(updatingFeeStatusStart())
        axios({url:`/fees/${studentId}`,method:'put',
        data:{
            fee:{
                month,
                paid
            }
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(response=>{
        console.log(response)
        if(response!==null){
            dispatch(updatingFeeStatusSuccess())
            return dispatch(feeStatus(username.value))
        }
        return updatingFeeStatusFail()
    })
    .catch(err=>{
        return dispatch(updatingFeeStatusFail())
    })
    }
}
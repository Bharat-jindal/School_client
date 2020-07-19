import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

const getallbookStart=()=>{
    return {
        type:actionTypes.GETTING_ALL_BOOK_START
    }
}

const getallbookSuccess=(books)=>{
    return {
        type:actionTypes.GETTING_ALL_BOOK_SUCCESS,
        books
    }
}

const getallbookError=()=>{
    return{
        type:actionTypes.GETTING_ALL_BOOK_ERROR
    }
}

export const getAllBook=(classNum)=>{
    return dispatch=>{
        dispatch(getallbookStart())
        axios({url:`/books`,method:'get',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(response=>{
        if(response!==null){
            return dispatch(getallbookSuccess(response.data))
        }
             getallbookError()
    })
    .catch(err=>{
        return dispatch(getallbookError())
    })
    }
}

export const getStudentBooks=(username)=>{
    return dispatch=>{
        dispatch(getallbookStart())
        axios({url:`/books/studBooks`,method:'post',
        data:{
            username
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(response=>{
        if(response!==null){
            return dispatch(getallbookSuccess(response.data.books))
        }
         getallbookError()
    })
    .catch(err=>{
        return dispatch(getallbookError())
    })
    }
}

//Same function for issue and post

const issuebookStart=()=>{
    return {
        type:actionTypes.ISSUE_BOOK_START
    }
}

const issuebookSuccess=(fees,classNum)=>{
    return {
        type:actionTypes.ISSUE_BOOK_SUCCESS
    }
}

const issuebookError=()=>{
    return{
        type:actionTypes.ISSUE_BOOK_ERROR
    }
}

export const issueBook=(bookId,student,available)=>{
    return dispatch=>{
        dispatch(issuebookStart())
        axios({url:`/books/issue/${bookId}`,method:'put',
        data:{
            student,
            available
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(response=>{
        if(response!==null){
            return dispatch(issuebookSuccess())
        }
         issuebookError()
    })
    .catch(err=>{
        return dispatch(issuebookError())
    })
    }
}

export const addBook=(title,subject)=>{
    return dispatch=>{
        dispatch(issuebookStart())
        axios({url:`/books`,method:'post',
        data:{
            title,
            subject
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(response=>{
        if(response!==null){
            return dispatch(issuebookSuccess())
        }
        dispatch(issuebookError())
    })
    .catch(err=>{
        return dispatch(issuebookError())
    })
    }
}

//Same function for delete and ipdate

const updatebookStart=()=>{
    return {
        type:actionTypes.UPDATE_BOOK_START
    }
}

const updatebookSuccess=()=>{
    return {
        type:actionTypes.UPDATE_BOOK_SUCCESS
    }
}

const updatebookError=()=>{
    return{
        type:actionTypes.UPDATE_BOOK_FAIL
    }
}

export const updateBook=(bookId,title,subject,bookswitch,username)=>{
    return dispatch=>{
        dispatch(updatebookStart())
        axios({url:`/books/${bookId}`,method:'put',
        data:{
            title,subject
        },
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(response=>{
        if(bookswitch==='All'){
            dispatch(getAllBook())
        }
        else if(username!==null){
            dispatch(getStudentBooks(username))
        }
        if(response!==null){
            return dispatch(updatebookSuccess())
        }
        return updatebookError()
    })
    .catch(err=>{
        return dispatch(updatebookError())
    })
    }
}

export const deleteBook=(bookId,bookswitch,username)=>{
    return dispatch=>{
        dispatch(updatebookStart())
        axios({url:`/books/${bookId}`,method:'delete',
    headers:{
        'Authorization':`bearer ${localStorage.getItem('idToken')}`
    }})
    .then(response=>{
        if(bookswitch==='All'){
            dispatch(getAllBook())
        }
        else if(username!==null){
            dispatch(getStudentBooks(username))
        }
        if(response!==null){
           return dispatch(updatebookSuccess())
        }
        return updatebookError()
    })
    .catch(err=>{
        return dispatch(updatebookError())
    })
    }
}

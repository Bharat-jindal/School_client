import updateObject from '../../utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState ={
    loading:false,
    loadingErr:false,
    books:[],
    issueLoading:false,
    issueError:false,
    issueSuccess:false,
    updateError:false,
    updateSuccess:false
}

const bookLoadingStart=(state,action)=>{
    return updateObject(state,{loading:true,loadingErr:false})
}
const bookLoadingSuccess=(state,action)=>{
    return updateObject(state,{loading:false,books:action.books,loadingErr:false})
}
const bookLoadingError=(state,action)=>{
    return updateObject(state,{loading:false,loadingErr:false})
}

//Issue or add new is issue
const issueStart=(state,action)=>{
    return updateObject(state,{issueloading:true,issueError:false,issueSuccess:false})
}
const issueSuccess=(state,action)=>{
    return updateObject(state,{issueloading:false,issueError:false,issueSuccess:true})
}
const issueError=(state,action)=>{
    return updateObject(state,{issueloading:false,issueError:true,issueSuccess:false})
}
 // Delete or nChange is update
const bookUpdateStart=(state,action)=>{
    return updateObject(state,{loading:true,updateError:false,updateSuccess:false})
}
const bookUpdateSuccess=(state,action)=>{
    return updateObject(state,{loading:false,updateError:false,updateSuccess:true})
}
const bookUpdateError=(state,action)=>{
    return updateObject(state,{loading:false,updateError:true,updateSuccess:false})
}




const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.GETTING_ALL_BOOK_START: return bookLoadingStart(state,action)
        case actionTypes.GETTING_ALL_BOOK_SUCCESS: return bookLoadingSuccess(state,action)
        case actionTypes.GETTING_ALL_BOOK_ERROR: return bookLoadingError(state,action)

        case actionTypes.ISSUE_BOOK_START: return issueStart(state,action)
        case actionTypes.ISSUE_BOOK_SUCCESS: return issueSuccess(state,action)
        case actionTypes.ISSUE_BOOK_ERROR: return issueError(state,action)

        case actionTypes.UPDATE_BOOK_START: return bookUpdateStart(state,action)
        case actionTypes.UPDATE_BOOK_SUCCESS: return bookUpdateSuccess(state,action)
        case actionTypes.UPDATE_BOOK_FAIL: return bookUpdateError(state,action)
        
        default: return state
    }
}

export default reducer
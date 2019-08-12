import updateObject from '../../utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState ={
    books:[],
    fees:[],
    tasks:[],
    loading: false,
    error: false,
}

const loadingStart = (state,action) => {
    return updateObject(state,{loading: true,error: false})
}
const storeFees = (state,action) => {
    return updateObject(state,{
        fees:action.fees,
        loading:false,
        error: false,
    })
}
const storeBooks = (state,action) => {
    return updateObject(state,{
        books:action.books,
        loading:false,
        error: false,
    })
}
const storeTasks = (state,action) => {
    return updateObject(state,{
        tasks:action.tasks,
        loading:false,
        error: false,
    })
}
const loadingFail = (state,action) => {
    return updateObject(state,{
        loading: false,
        error: true
    })
}

const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.STUDENT_PROPERTY_LOADING_START : return loadingStart(state,action)
        case actionTypes.STUDENT_STIRE_TASKS : return storeTasks(state,action)
        case actionTypes.STUDENT_STORE_BOOKS: return storeBooks(state,action)
        case actionTypes.STUDENT_STORE_FEES: return storeFees(state,action)
        case actionTypes.STUDENT_PROPERTY_LOADING_ERROR: return loadingFail(state,action)

        
        default: return state
    }
}

export default reducer
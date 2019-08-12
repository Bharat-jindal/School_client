import updateObject from '../../utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState ={
    loading:false,
    loadingErr:false,
    fees:[],
    addError:false,
    addSuccess:false,
    deleteError:false,
    deleteSuccess:false,
    classNum:null,
    studLoading:false,
    studGet:[],
    studGetError:false,
    updateError:false,
    updateSuccess:false,
    stud_id:null
}

const feeLoadingStart=(state,action)=>{
    return updateObject(state,{loading:true,loadingErr:false,classNum:null})
}
const feeLoadingSuccess=(state,action)=>{
    return updateObject(state,{loading:false,fees:action.fees,loadingErr:false,classNum:action.classNum})
}
const feeLoadingError=(state,action)=>{
    return updateObject(state,{loading:false,loadingErr:false,classNum:null})
}

const feeAddStart=(state,action)=>{
    return updateObject(state,{loading:true,addError:false,addSuccess:false})
}
const feeAddSuccess=(state,action)=>{
    return updateObject(state,{loading:false,addError:false,addSuccess:true})
}
const feeAddError=(state,action)=>{
    return updateObject(state,{loading:false,addError:true,addSuccess:false})
}

const feeDeleteStart=(state,action)=>{
    return updateObject(state,{loading:true,deleteError:false,deleteSuccess:false})
}
const feeDeleteSuccess=(state,action)=>{
    return updateObject(state,{loading:false,deleteError:false,deleteSuccess:true})
}
const feeDeleteError=(state,action)=>{
    return updateObject(state,{loading:false,deleteError:true,deleteSuccess:false})
}

const feeGettingStart=(state,action)=>{
    return updateObject(state,{studLoading:true,studGetError:false,stud_id:null})
}
const feeDeGettingsuccess=(state,action)=>{
    return updateObject(state,{studLoading:false,studGetError:false,studGet:action.fees,stud_id:action._id})
}
const feeGettingError=(state,action)=>{
    return updateObject(state,{studLoading:false,studGetError:true,studGet:[],stud_id:null})
}

const feeUpdatingStart=(state,action)=>{
    return updateObject(state,{studLoading:true,updateError:false,updateSuccess:false})
}
const feeUpdaingSuccess=(state,action)=>{
    return updateObject(state,{studLoading:false,updateError:false,updateSuccess:true})
}
const feeUpdatingError=(state,action)=>{
    return updateObject(state,{studLoading:false,updateError:true,updateSuccess:false})
}



const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.FEE_LOADING_START:return feeLoadingStart(state,action)
        case actionTypes.FEE_LOADING_SUCCESS:return feeLoadingSuccess(state,action)
        case actionTypes.FEE_LOADING_ERROR:return feeLoadingError(state,action)

        case actionTypes.FEE_ADD_START:return feeAddStart(state,action)
        case actionTypes.FEE_ADD_SUCCESS: return feeAddSuccess(state,action)
        case actionTypes.FEE_ADD_ERROR:return feeAddError(state,action)

        case actionTypes.FEE_DELETE_START: return feeDeleteStart(state,action)
        case actionTypes.FEE_DELETE_SUCCESS: return feeDeleteSuccess(state,action)
        case actionTypes.FEE_DELETE_ERROR:return feeDeleteError(state,action)

        case actionTypes.GETTING_FEES_START: return feeGettingStart(state,action)
        case actionTypes.GETTING_FEES_SUCCESS: return feeDeGettingsuccess(state,action)
        case actionTypes.GETTING_FEES_ERROR: return feeGettingError(state,action)

        case actionTypes.UPDATING_FEES_START: return feeUpdatingStart(state,action)
        case actionTypes.UPDATING_FEES_SUCCESS: return feeUpdaingSuccess(state,action)
        case actionTypes.UPDATING_FEES_ERROR: return feeUpdatingError(state,action)
        
        default: return state
    }
}

export default reducer
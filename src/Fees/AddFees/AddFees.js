import React ,{Component} from 'react';
import './AddFees.css'
import {connect} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.css";

import * as actions from '../../store/actions/index';

class addFees extends Component {
    state={
        info:false,
        fields:{
            month:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            class:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            amount:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            }
        },
        clicked:false
    }

    checkvalidity=(value,touched)=>{
        return (value.trim()!=='' && touched)
    }

    changeinfoHAndler=()=>{
        const info=this.state.info;
        this.setState({info:!info})
    }
    clickChangeHandler=(event,key)=>{
        var updatedfields={...this.state.fields};
        const newfeildValue={...this.state.fields[key]}
        const validity=this.checkvalidity(event.target.value,true);
        newfeildValue.validity=validity
        newfeildValue.value=event.target.value
        updatedfields[key]=newfeildValue;
        this.setState({fields:updatedfields})
    }
    onFocusHAndler=(key)=>{
        var updatedfields={...this.state.fields};
        const newfeildValue={...this.state.fields[key]}
        const validity=this.checkvalidity(newfeildValue.value,true);
        newfeildValue.validity=validity
        newfeildValue.touched=true
        newfeildValue.blurred=false;
        updatedfields[key]=newfeildValue;
        this.setState({fields:updatedfields})
    }
    onBlurHandler=(key)=>{
        var updatedfields={...this.state.fields}
        const newfeildValue={...this.state.fields[key]}
        newfeildValue.blurred=true;
        const validity=this.checkvalidity(newfeildValue.value,this.state.fields[key].touched);
        newfeildValue.validity=validity
        updatedfields[key]=newfeildValue;
        this.setState({fields:updatedfields})
    }

    addFees =() =>{
        this.setState({clicked:true});
        this.props.onaddFeesRequest(
            this.state.fields
        )
    }

    render(){
        var spinner=null;
        if(this.props.loading){
            spinner=<span className="fa fa-spinner"></span>
        }

        var error=null;
        if(this.props.error && this.state.clicked){
            error=<p>Something Went Wrong</p>
        }
        var added=null;
        if(this.props.updated && this.state.clicked){
            added=<p>Fees added successully</p>
        }
        let formElementArray=[];
        var formValidity=false
        for(let key in this.state.fields){
            formValidity=formValidity || (!this.state.fields[key].validity || !this.state.fields[key].touched)
            formElementArray.push({
                id: key
            })
        }
            
            let form=(
                <div >
                {formElementArray.map(formElement => {
                    var classname=['AddFeesInput']
                    if(!this.state.fields[formElement.id].validity && this.state.fields[formElement.id].blurred){
                        classname.push('invalid')
                    }
                return (
                    <div key={formElement.id}>
                        <span className={'AddFeesInputText'}>{formElement.id}:</span>
                <input 
                value={this.state.fields[formElement.id].value}
                className={classname.join(' ')}
                 onChange={(event) =>this.clickChangeHandler(event,formElement.id)} 
                 onFocus={this.onFocusHAndler.bind(this,formElement.id)} 
                 onBlur={this.onBlurHandler.bind(this,formElement.id)}/>
                 </div>)
                }
                )}
                </div>
            )

        return(
            <div className="AddFeesMainsign">
                {form}
                <button className="AddTeacherMainButton"
                onClick={()=>this.addFees()}
                disabled={formValidity}>Add Fees</button>
                {spinner}
                {error}
                {added}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        updated:state.fees.addSuccess,
        error:state.fees.addError,
        loading:state.fees.loading,
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onaddFeesRequest:(fields)=>dispatch(actions.addFees((fields)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(addFees);
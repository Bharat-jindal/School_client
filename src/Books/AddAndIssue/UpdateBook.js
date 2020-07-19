import React ,{Component} from 'react';
import './AddAndIssue.css'
import {connect} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.css";

import * as actions from '../../store/actions/index';
import Spinner from '../../containers/UI/Spinner/Spinner'

class AddBook extends Component {
    state={
        info:false,
        fields:{
            title:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            subject:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
        },
        clicked:false,
    }
    componentDidMount(){
        var updatedFields={...this.state.fields}
        updatedFields.title.value=this.props.title;
        updatedFields.subject.value=this.props.subject
        this.setState({fields:updatedFields})
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

    addBook =() =>{
        this.setState({clicked:true});
        this.props.onUpdateBookRequest(
            this.props.bookId,
            this.state.fields.title.value,
            this.state.fields.subject.value,
            this.props.bookSwitch,
            this.props.username
        )
    }
    render(){
        let info=null
        if(this.props.success && this.state.clicked){
            info=<p>Book Updated</p>
        }
        if(this.props.error && this.state.clicked){
            info=<p>Somethin Went Wrong</p>
        }
        
        var spinner=null;
        if(this.props.loading){
            spinner=<Spinner />
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
                    var classname=['AddBookInput']
                    if(!this.state.fields[formElement.id].validity && this.state.fields[formElement.id].blurred){
                        classname.push('invalid')
                    }
                return (
                    <div key={formElement.id}>
                        <span className={'AddBookInputText'}>{formElement.id}:</span>
                <input 
                value={this.state.fields[formElement.id].value}
                className={classname.join(' ')+' common-input'}
                 onChange={(event) =>this.clickChangeHandler(event,formElement.id)} 
                 onFocus={this.onFocusHAndler.bind(this,formElement.id)} 
                 onBlur={this.onBlurHandler.bind(this,formElement.id)}/>
                 </div>)
                }
                )}
                </div>
            )

        return(
            <div className="UpdateBookMainsign">
                {form}
                <button className="common-form-buttons"
                    style={{marginTop:"20px"}}
                disabled={formValidity}>Update Book</button>
                {info}
                {spinner}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
    loading:state.books.loading,
    error:state.books.updateError,
    success:state.books.updateSuccess,
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onUpdateBookRequest:(bookId,title,subject,bookSwitch,username)=>dispatch((actions.updateBook(bookId,title,subject,bookSwitch,username)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddBook);
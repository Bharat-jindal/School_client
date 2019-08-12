import React ,{Component} from 'react';
import './AddAndIssue.css'
import {connect} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.css";

import * as actions from '../../store/actions/index'

class AddBook extends Component {
    state={
        info:false,
        fields:{
            bookId:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
            username:{
                value:'',
                validity:true,
                blurred:true,
                touched:false
            },
        },
        clicked:false,
        issueOrReturn:'Issue'
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

    issueBook =() =>{
        this.setState({clicked:true});
        var username=this.state.fields.username.value;
        var available=false
        if(this.state.issueOrReturn==='Return'){
            username='';
            available=true
        }
        this.props.onissueBookRequest(this.state.fields.bookId.value,
            username,
            available
        )
    }

    setIssue=()=>{
        this.setState({issueOrReturn:'Issue'})
    }
    setReturn=()=>{
        this.setState({issueOrReturn:'Return'})
    }

    render(){
        let info=null
        if(this.props.success && this.state.clicked){
            info=<p>Book {this.state.issueOrReturn}</p>
        }
        if(this.props.error && this.state.clicked){
            info=<p>Somethin Went Wrong</p>
        }
        
        var spinner=null;
        if(this.props.loading){
            spinner=<span className="fa fa-spinner"></span>
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
                className={classname.join(' ')}
                 onChange={(event) =>this.clickChangeHandler(event,formElement.id)} 
                 onFocus={this.onFocusHAndler.bind(this,formElement.id)} 
                 onBlur={this.onBlurHandler.bind(this,formElement.id)}/>
                 </div>)
                }
                )}
                </div>
            )

            var issueClass="IssueReturnSwitchButton";
            var returnClass="IssueReturnSwitchButton";
            if(this.state.issueOrReturn==='Issue'){
                issueClass="IssueReturnSwitchButtonHighLited"
            }
            else{
                returnClass="IssueReturnSwitchButtonHighLited"
            }

        return(
            <div className="AddBookMainsign">
                <button onClick={this.setIssue} className={issueClass}>ISSUE</button>
                <button onClick={this.setReturn} className={returnClass}>RETURN</button>
                {form}
                <button className="AddBookMainButton"
                onClick={()=>this.issueBook()}
                disabled={formValidity}>{this.state.issueOrReturn} Book</button>
                {info}
                {spinner}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
    loading:state.books.issueLoading,
    error:state.books.issueError,
    success:state.books.issueSuccess,
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onissueBookRequest:(bookId,username,available)=>dispatch((actions.issueBook(bookId,username,available)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddBook);
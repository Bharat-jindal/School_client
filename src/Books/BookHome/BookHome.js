import React ,{Component} from 'react';
import './BookHome.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import "@fortawesome/fontawesome-free/css/all.css";

import Backdrop from '../../containers/UI/Backdrop/Backdrop';
import AddBook from '../AddAndIssue/AddBook';
import IssueBook from '../AddAndIssue/IssueBook';
import UpdateBook from '../AddAndIssue/UpdateBook';
import Spinner from '../../containers/UI/Spinner/Spinner';

class BookHome extends Component {
    state={
        bookSwitch:'All',
        username:{
            value:''
        },
        bookClicked:false,
        add:false,
        delIndex:null,
        issueSwitch:'Issue',
        update:false,
        book:null
    }

    changeBookSwitchHandler=(event)=>{
        this.setState({bookSwitch:event.target.value})
    }
    changeIssueSwitchHandler=(event)=>{
        this.setState({issueSwitch:event.target.value})
    }
    usernameChangeHandler=(event)=>{
        const updatedusername={...this.state.username}
        updatedusername.value=event.target.value
        this.setState({username:updatedusername})
    }
    getTheBooks=()=>{
        this.setState({bookClicked:true})
        if(this.state.bookSwitch==='All'){
            this.props.onGetAllBooksRquest()
        }
        if(this.state.bookSwitch==='Student'){
            this.props.onGetStudentBookRequest(this.state.username.value)
        }
    }

    hideBackdrop=()=>{
        this.setState({update:false,book:null})
    }

    bookDeleteHandler=(bookId,index)=>{
        this.setState({delIndex:index})
        this.props.onDeleteBookRequest(bookId,this.state.bookSwitch,this.state.username.value)
    }

    bookUpdateHandler=(book)=>{
        this.setState({book:book,update:true})
    }

    render(){
        var studentIdInput=null;
        if(this.state.bookSwitch==='Student'){
            studentIdInput=<div>
                <span>USERNAME:</span>
                <input value={this.state.username.value} onChange={this.usernameChangeHandler} className="common-input"/>
            </div>
        }
        var books=this.props.books.map((book,index)=>{
            return <div key={index} className="booksList">
                <span style={{paddingRight:'1vw'}}>{book.title.toUpperCase()}</span>
                <span style={{paddingRight:'1vw'}}>{book.subject}</span>
                <span style={{paddingRight:'1vw'}}>{book.available?'Available':book.student}</span>
                <br />
                <button onClick={this.bookDeleteHandler.bind(this,book._id,index)} className="common-form-buttons" 
                    style={{marginTop:"10px",marginLeft:"5px",marginRight:"5px"}}>DELETE</button>
                <button onClick={this.bookUpdateHandler.bind(this,book)} className="common-form-buttons" 
                    style={{marginTop:"10px",marginLeft:"5px",marginRight:"5px"}}>UPDATE</button>
                <br />
                {(index===this.state.delIndex && this.props.loading)?<Spinner />:null}
                {(index===this.state.delIndex && this.props.updateError)?<span >Something Went Wrong</span>:null}
                
            </div>
        })

        var updateBox=null;
        if(this.state.update){
            updateBox=<UpdateBook 
            title={this.state.book.title}
            subject={this.state.book.subject}
            bookSwitch={this.state.bookSwitch}
            username={this.state.username.value}
            bookId={this.state.book._id}
            />
        }
        return <div>
            <div className="BookSwitch">
                <select value={this.state.bookSwitch} onChange={this.changeBookSwitchHandler} className="FeeSelect">
                    <option value='All' >ALL</option>
                    <option value='Student' >STUDENT</option>
                </select>
                {studentIdInput}
                <button onClick={this.getTheBooks} style={{padding:'15px',border:'none'}} >FIND</button>
                {this.props.loading && this.state.bookClicked ?<Spinner />:null}
                {books}
                {updateBox}
              <Backdrop show={this.state.update} clicked={this.hideBackdrop} />
                </div>     


                <div className="IssueOrAddBook">
                <select value={this.state.issueSwitch} onChange={this.changeIssueSwitchHandler} className="FeeSelect">
                    <option value='Issue' >ISSUE</option>
                    <option value='Add' >ADD</option>
                </select>
                {this.state.issueSwitch==='Add'?<AddBook />:<IssueBook />}
                </div>             
        </div>
    }
}

const mapStateToProps=(state)=>{
    return {
        loading:state.books.loading,
        loadingErr:state.books.loadingErr,
        books:state.books.books,
        updateError:state.books.updateError,
        updateSuccess:state.books.updateSuccess
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onGetAllBooksRquest:()=>dispatch(actions.getAllBook()),
        onGetStudentBookRequest:(username)=>dispatch(actions.getStudentBooks(username)),
        onUpdateBookReques:(bookId,bookSwitch,username)=>dispatch(actions.updateBook(bookId,bookSwitch,username)),
        onDeleteBookRequest:(bookId,bookSwitch,username)=>dispatch(actions.deleteBook(bookId,bookSwitch,username))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookHome)
import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import './Properties.css';
import Spinner from '../../containers/UI/Spinner/Spinner'

class GetBooks extends Component {

    componentDidMount(){
        this.props.onGetBooksRequest()
    }
    render(){
        var books=this.props.books.map((book,index)=>{
            return <div key={index} className="common-form-display">
                <div><span style={{paddingRight:'10px',fontWeight:"bold"}}>Title:</span>{book.title}</div>
                <div><span style={{paddingRight:'10px',fontWeight:"bold"}}>Subject:</span>{book.subject}</div>
            </div>
        })
        return <div>
        {this.props.loading?<Spinner />:null}
            {this.props.error?<h2 style={{color:'#ff9900'}}>Something Went Wrong</h2>:null}
            {books}
        </div>
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.student.loading,
        books:state.student.books,
        error:state.student.error
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onGetBooksRequest:()=>dispatch(actions.getStudentPropertyBooks())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GetBooks)
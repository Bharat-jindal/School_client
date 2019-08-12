import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import './Properties.css'

class GetBooks extends Component {

    componentDidMount(){
        this.props.onGetBooksRequest()
    }
    render(){
        var books=this.props.books.map((book,index)=>{
            return <div key={index} className="StudentPropertiesList">
                <span style={{paddingRight:'5vw'}}>{book.title}</span>
                <span>{book.subject}</span>
            </div>
        })
        return <div>
        {this.props.loading?<span className="fa fa-spinner studentPropertiesSpinner"></span>:null}
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
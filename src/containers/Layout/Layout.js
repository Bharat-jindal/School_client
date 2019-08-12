import React ,{Component} from 'react';
import './Layout.css';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

import Footer from '../Footer/Footer';

class Layout extends Component {
    state= {
        show: false
    }

    SideDrawerHide= () => {
        this.setState({show:false});
    }

    SideDrawerShown= () => {
        this.setState((prevState) => {
            return ({show: !prevState.show})
        });
    }

    render() {
        var admin=false;
        console.log(this.props.user)
        if(this.props.user!==null){
            admin=this.props.user.admin
        }
        return (
        <div>
            <SideDrawer show={this.state.show}
            clicked={this.SideDrawerHide}
            role={this.props.role}
            admin={admin}/>
            <Toolbar 
            clicked={this.SideDrawerShown}
            role={this.props.role}
            admin={admin}/>
            <main className='container'>
                {this.props.children}
            </main>
            <Footer />
            </div>

        )
    }   
};


export default (Layout);

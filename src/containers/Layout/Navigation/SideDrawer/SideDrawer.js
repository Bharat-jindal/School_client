import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';

const sideDrawer= (props) => {
    let classes = ['SideDrawer','Close'];
    if(props.show){
        classes = ['SideDrawer','Open'];
    }
    return (
        <div>
            <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={classes.join(' ')} onClick={props.clicked}>
            <div className={'SideDrawerLogo'}>
            <Logo />
            </div>
            <NavigationItems role={props.role} admin={props.admin}/>
        </div>
        </div>
    )
}

export default sideDrawer
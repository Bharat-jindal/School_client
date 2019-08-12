import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props)=>{ 
    var retValue =null;
    if(props.role==='student'){
        retValue=<ul className={'NavigationItems'}>
        <NavigationItem link='/' exact >Home</NavigationItem>
        <NavigationItem link='/books' >Books</NavigationItem>
        <NavigationItem link='/myFees' >Fees</NavigationItem>
        <NavigationItem link='/myTasks' >Tasks</NavigationItem>
        <NavigationItem link='/logout'>Logout</NavigationItem>
        </ul>
    }
    if(props.role==='school'){
        retValue=<ul className={'NavigationItems'}>
        <NavigationItem link='/' exact >Home</NavigationItem>
        <NavigationItem link='/teachers' >Teachers</NavigationItem>
        <NavigationItem link='/logout'>Logout</NavigationItem>
        </ul>
    }
    if(props.role==='teacher' && props.admin===true){
        retValue=<ul className={'NavigationItems'}>
        <NavigationItem link='/' exact >Home</NavigationItem>
        <NavigationItem link='/library' >Library</NavigationItem>
        <NavigationItem link='/fees' >Fees</NavigationItem>
        <NavigationItem link='/student' >Students</NavigationItem>
        <NavigationItem link='/tasks' >Tasks</NavigationItem>
        <NavigationItem link='/logout'>Logout</NavigationItem>
        </ul>
    }
    if(props.role==='teacher' && props.admin===false){
        retValue=(<ul className={'NavigationItems'}>
        <NavigationItem link='/' exact >Home</NavigationItem>
        <NavigationItem link='/tasks' >Tasks</NavigationItem>
        <NavigationItem link='/logout'>Logout</NavigationItem>
        </ul>)
    }
    return retValue;
}

 
export default navigationItems;
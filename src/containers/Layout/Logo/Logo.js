import React from 'react';
import imagelogo from '../../../assets/smart.jfif';
import './Logo.css'

const logo=() => (
    <div className={'Logo'}>
        <img src={imagelogo} alt='MyBurger'/>
    </div>
)
export default logo;
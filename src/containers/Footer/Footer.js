import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";

import './Footer.css';

const Footer=(props)=>{
    return (
        <div className="Footer">
            <div className="Footer-social">
            <i className="fab fa-instagram footerIcons"></i>
            <i className="fab fa-facebook  footerIcons"></i>
            <i className="fab fa-google footerIcons"></i>               
            </div>
            <br />
            <div >
            <span className="fa fa-address-book footerIconsAdd"></span><span className="footer-social">Kurukshetra</span>
            <span className="fa fa-phone footerIconsAdd"></span><span className="footer-social">+91 38982378392</span>
            </div>
        </div>
    )
};

export default Footer;
import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return <div className="Spinner">
        <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
}

export default Spinner
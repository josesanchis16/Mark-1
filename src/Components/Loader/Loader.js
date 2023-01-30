import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center p-5'>
            <Spinner animation="border" />
            <p>Loading...</p>
        </div>
    )
}

export default Loader;
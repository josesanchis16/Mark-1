import React from 'react';

const CardFooter = ({ children }) => {
    return (
        <div className='pt-3 border-top d-flex justify-content-end align-items-center'>
            {children}
        </div>
    )
}

export default CardFooter;
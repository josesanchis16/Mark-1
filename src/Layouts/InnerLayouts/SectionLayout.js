import React from 'react';

const SectionLayout = ({ children, title, description }) => (
    <div className='mb-2 flex-column d-flex justify-content-center align-items-center w-100'>
        <div className='border-bottom pb-3 w-100' style={{ lineHeight: 1 }}>
            <h5 className='mb-0'>{title}</h5>
            {description && <small className='mb-0 text-muted'>{description}</small>}
        </div>
        <div className='p-1 p-md-2 w-100'>
            {children}
        </div>
    </div>
)

export default SectionLayout;
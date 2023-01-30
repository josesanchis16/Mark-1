import React from 'react';

const RequiredField = (props) => {
    return (
        <span style={{ color: "#ff4545" }} {...props}>*</span>
    )
}

export default RequiredField;
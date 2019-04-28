import React from 'react';

export default Content => props => props.show ? (<Content {...props}/>) : null;
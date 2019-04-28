import React from 'react';

export default Content => ({show, ...props}) => show ? (<Content {...props}/>) : null;
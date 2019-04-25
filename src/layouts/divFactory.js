import React from 'react';

export default classList => classList.map( className => props => <div className={className} {...props}/>);
import React from 'react';

export default route => ({path, children}) => route === path ? <>{children}</> : null;
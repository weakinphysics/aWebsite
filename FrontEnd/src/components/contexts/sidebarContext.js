import React from 'react';

const activeElements = [];
for(let i = 0; i < 6; i++){
    activeElements.push(false);
}

const sidebarContext = React.createContext({
    activeElements: activeElements,
    setActiveElements: undefined
})


export default sidebarContext;
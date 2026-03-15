import React from 'react';

const AppContext = React.createContext({
    isLogin : false,
    setIsLogin : () => {}
})

export default AppContext;
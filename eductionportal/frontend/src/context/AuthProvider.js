import React, { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [toastFun, setToastFun] = useState(null);


    return (
        <AuthContext.Provider value={{auth, setAuth, toastFun, setToastFun }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
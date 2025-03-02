import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    // sign in, sign out, get user


    return (

        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}





export const useAuth = () => {
    return useContext(AuthContext);
  };



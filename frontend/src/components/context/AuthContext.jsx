import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useLocation } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)

    const login = async (formData) => {        
        try{
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`,
            { user: formData },
            { withCredentials: true }
          )
          toast.success('Successfully Logged in')
          setUser(response?.data?.user)
          console.log('user', response.data)

          if (response.data.role === 'admin'){
            setIsAdmin(true)
          } else {
            setIsUser(true)
          }
        }catch(e){
          console.log(e)
          console.log('error')
        }
      }

      const checkAuth = async () => {
        try{
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/current-user`, { withCredentials: true })
          setUser(response.data)
          console.log('checking status', response.data)

          if (response.data.role === 'user'){
            setIsUser(true)
            setIsAdmin(false)
          } else {
            setIsAdmin(true)
            setIsUser(false)
          }
        }catch(e){
          console.log(e)
        }
      }

      useEffect(() => {
        checkAuth()
      }, [location.pathname])


    return (

        <AuthContext.Provider value={{user, isAdmin, isUser, authenticated, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}


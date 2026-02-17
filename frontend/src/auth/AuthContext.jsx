import { createContext,useEffect,useState} from "react";
import { loginUser,signUpUser,getUserProfile } from "../api/auth.api";
import { getToken,setToken,removeToken } from "../utils/auth";

const AuthContext = createContext(null); 

const AuthProvider =({children})=>{
  const[user,setUser] = useState(null); 
  const [loading,setLoading] = useState(true); 
  
  //c
  useEffect(()=>{
    const initAuth = async()=>{
      const token = getToken(); 

      if(!token){
        setLoading(false); 
        return; 
      }
        try {
            const res = await getUserProfile();
            setUser({...res.data.user, 
                    permissions: res.data.permissions ||[]
            }); 
        } catch (error) {
            setUser(null);
            removeToken(); 
        } finally{
            setLoading(false); 
        }
    }; 
    initAuth(); 
  },[]); 

  const login = async(credentials)=>{
    const res = await loginUser(credentials);

    setToken(res.data.token); 
    setUser({
      ...res.data.user, 
      permissions: res.data.permissions
    }); 

    return res; 
  }
  const signUp = async(data)=>{
    const res = await signUpUser(data); 

    setToken(res.data.token); 
    setUser(res.data.user); 
    return res; 
  }
  const logout=()=>{
    removeToken(); 
    setUser(null); 
  }; 

  return(
    <AuthContext.Provider value={
      {
        user,
        loading, 
        isAuthenticated: !!user, 
        login, signUp, logout
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}


export {
  AuthContext, 
  AuthProvider
}
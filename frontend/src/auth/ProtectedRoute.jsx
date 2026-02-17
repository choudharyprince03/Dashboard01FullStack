import {Navigate} from "react-router-dom"; 
import useAuth from "./useAuth";

const ProtectedRoute =({children})=>{
    const {isAuthenticated, loading } = useAuth(); 

    if(loading) return null; 

    if(!isAuthenticated){
        //the replace here saves us from a back button loop, 
        //which can occur due to the browser history , 
        //fpr example, user was not authenticated, 
        //at dashboard, we navigated it them to the login page, 
        //mnow in the history, we see dashboard -> login, 
        //this when back button is clicked caused a loop, or a flicker. 
        
        return <Navigate to="/login" replace />
    }

    return children; 
}

export default ProtectedRoute; 
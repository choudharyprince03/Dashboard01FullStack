import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const PermissionRoute =({children,requiredPermission})=>{
    const{user,loading} = useAuth(); 

    if (loading) return <div>Loading...</div>;

    if(!user){
        return <Navigate to={"/login"} replace />
    }

    const hasPermission = 
    user.permissions &&
    user.permissions.includes(requiredPermission); 

    if(!hasPermission){
        return <Navigate to={'/'} replace />
    }
    return children; 
}
export default PermissionRoute; 
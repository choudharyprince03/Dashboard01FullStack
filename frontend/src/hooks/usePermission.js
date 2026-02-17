import useAuth from "../auth/useAuth";

const usePermission = (permission)=>{
    const {user} = useAuth();

    return user?.permissions?.includes(permission); 
}

export default usePermission;
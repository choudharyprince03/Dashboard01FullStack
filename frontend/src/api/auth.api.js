import api from "./axios.js";

const loginUser = (data)=>  api.post('/auth/login',data); 
const signUpUser =(data)=>  api.post('/auth/signup',data); 


const getUserProfile =()=> api.get('/auth/profile'); 


export {
    loginUser,
    signUpUser, 
    getUserProfile
}
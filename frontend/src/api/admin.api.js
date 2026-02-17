import api from "./axios";

const getAllUsers =()=> api.get('admin/users'); 


const promoteUser = (id)=> api.patch(`admin/promote/${id}`); 

export {
   getAllUsers,
   promoteUser
}
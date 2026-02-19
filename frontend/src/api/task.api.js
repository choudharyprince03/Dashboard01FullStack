import api from "./axios";

const createTask = (data)=> api.post('/tasks', {...data}); 

const getTasks = () => api.get('/tasks/my')

const updateTasks= (id,data)=> api.patch(`/tasks/${id}/status`,data); 

const deleteTasks =(id)=> api.delete(`/tasks/${id}`); 


export {
    createTask,
    getTasks,
    updateTasks,
    deleteTasks
}
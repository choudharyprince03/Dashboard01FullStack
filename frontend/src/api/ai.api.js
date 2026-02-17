import api from "./axios.js"; 

const getInsights =()=>api.get("/ai/insights"); 


export {
    getInsights,
}
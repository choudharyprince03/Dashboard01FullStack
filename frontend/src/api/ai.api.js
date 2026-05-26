import api from "./axios.js"; 

const getInsights =(refresh = false)=>api.get(`/ai/insights${refresh ? '?refresh=true' : ''}`); 


export {
    getInsights,
}
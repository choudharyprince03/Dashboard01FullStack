import activityLogModel from "../model/activityLog.model.js"

const logActivity = async({actor,action,task,metadata = {}})=>{
    await activityLogModel.create({
        actor,
        action,
        task,
        metadata
    }); 
}
export default logActivity;  
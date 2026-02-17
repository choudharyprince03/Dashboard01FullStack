/*
This is non-negotiable for:
audits
debugging
AI insights
trust
Without logs, AI is blind.
 */

import mongoose, { mongo } from "mongoose";

const ActivityLog = mongoose.Schema({
    action : {
        type: String,
        required: true,
        enum:[
             "TASK_CREATED",
             "TASK_STATUS_UPDATED",
             "TASK_ASSIGNED"
        ]
    },
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    task:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,

    },
    metadata: {
        type: Object, 

    }},{timestamps: true}
); 

ActivityLog.index({task:1});
ActivityLog.index({actor:1}); 
ActivityLog.index({action:1}); 

export default mongoose.model("ActivityLog",ActivityLog); 
 
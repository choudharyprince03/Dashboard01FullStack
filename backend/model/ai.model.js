import mongoose from "mongoose";

const AiInsightSchema = mongoose.Schema({

    scope: {
        type: String,
        enum: ["user","manager", "system"],
        required: true
    },

    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function(){
        return this.scope !== "system"; 
      }
    },

    content: {
        type: String ,
        required: true
    }
},{timestamps: true}); 

AiInsightSchema.index({ scope:1 }); 
AiInsightSchema.index({ target:1 }); 
AiInsightSchema.index({ createdAt:-1 }); 

export default mongoose.model("AiInsight", AiInsightSchema); 

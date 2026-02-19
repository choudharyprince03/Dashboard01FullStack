import OpenAI from "openai"; 
import "dotenv/config"; 

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}); 
const runLLM = async(prompt)=>{
   try {
     const response = await client.chat.completions.create({
         model:"gpt-4o",
         messages:[
           { role: "system", content: "You are an analytical assistant." },
           { role: "user", content: prompt }
         ],
         temperature:0.3
     }); 
     return response.choices[0].message.content;
   } catch (error) {
        console.error("LLM error:", error);
        throw new Error("AI service unavailable");
   }
}
export default runLLM; 



// import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({
//   model: "gemini-pro"
// });

// const runLLM = async (prompt) => {
//   try {
//     const result = await model.generateContent(prompt);

//     return result.response.text();

//   } catch (error) {
//     console.error("Gemini LLM error:", error);
//     console.log(error); 
//     return "AI insight is temporarily unavailable.";
//   }
// };

// export default runLLM;

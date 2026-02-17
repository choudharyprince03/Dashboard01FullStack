import AIInsight from "../model/ai.model.js";

import{  
  aggregateUserData,
  aggregateManagerData,
  aggregateSystemData
} from "../services/aiAggregation.service.js"

import {
  buildUserPrompt,
  buildManagerPrompt,
  buildSystemPrompt
} from "../services/aipromptBuilder.service.js";

import runLLM from "../services/llm.service.js";

export const getAIInsight = async (req, res, next) => {
  try {
    let scope;
    let summary;
    let prompt;
    let target = null;

    // Decide scope by role
    if (req.user.role === "admin") {
      scope = "system";
      summary = await aggregateSystemData();
      prompt = buildSystemPrompt(summary);
    } 
    else if (req.user.role === "manager") {
      scope = "manager";
      target = req.user.id;
      summary = await aggregateManagerData();
      prompt = buildManagerPrompt(summary);
    } 
    else {
      scope = "user";
      target = req.user.id;
      summary = await aggregateUserData(req.user.id);
      prompt = buildUserPrompt(summary);
    }

    // Optional caching (latest insight)
    const existingInsight = await AIInsight.findOne({ scope, target })
      .sort({ createdAt: -1 });

    if (existingInsight) {
      return res.json({
        insight: existingInsight,
        cached: true
      });
    }

    // Run AI
    const content = await runLLM(prompt);

    // Store insight
    const insight = await AIInsight.create({
      scope,
      target,
      content
    });

    res.json({
      insight,
      cached: false
    });

  } catch (error) {
    next(error);
  }
};

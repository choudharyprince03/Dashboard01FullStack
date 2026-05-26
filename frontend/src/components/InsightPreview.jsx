import { motion as Motion } from "framer-motion";
import { Sparkles, BrainCircuit } from "lucide-react";

const InsightPreview = ({ insight, onRefresh, isRefreshing }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden bg-[#F7F6F2]/95 backdrop-blur-md p-6 rounded-2xl border border-[#D8D3C7] shadow-sm transition-colors duration-300"
    >
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#DFE8DC] rounded-lg border border-[#C6D7C2] transition-colors">
            <Sparkles className="w-5 h-5 text-[#6B8F71] transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-[#2C3040] transition-colors">
            AI Insight
          </h3>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`text-sm bg-[#6B8F71] hover:bg-[#5F8065] px-3 py-1.5 rounded text-white transition-colors flex items-center gap-2 ${
              isRefreshing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isRefreshing ? (
              <>
                <BrainCircuit className="w-4 h-4 animate-pulse" />
                Generating...
              </>
            ) : (
              "Generate Insights"
            )}
          </button>
        )}
      </div>

      <div className="relative z-10">
        {!insight ? (
          <div className="flex flex-col items-center justify-center py-8 opacity-70">
            <BrainCircuit className="w-12 h-12 text-[#8A8F9E]/60 mb-3" />
            <p className="text-[#7B8190] text-sm transition-colors">
              Gathering data to generate your next insight...
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[#3D4354] leading-relaxed whitespace-pre-line bg-[#EDEAE2] p-4 rounded-xl border border-[#D8D3C7] text-sm transition-colors">
              {insight.content}
            </p>
            {insight.modelUsed && (
              <div className="flex justify-end">
                <span className="text-xs text-[#8A8F9E] bg-[#E8E6E0] px-2 py-1 rounded-md border border-[#D8D3C7]">
                  Powered by: {insight.modelUsed}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Motion.div>
  );
};

export default InsightPreview;

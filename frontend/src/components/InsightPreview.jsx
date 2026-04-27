import { motion } from "framer-motion";
import { Sparkles, BrainCircuit } from "lucide-react";

const InsightPreview = ({ insight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden bg-gradient-to-br from-white/90 to-purple-50/80 dark:from-[#121A2F]/80 dark:to-purple-900/10 backdrop-blur-md p-6 rounded-2xl border border-purple-200 dark:border-purple-500/20 shadow-md dark:shadow-[0_0_30px_rgba(168,85,247,0.05)] transition-colors duration-300"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/50 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none transition-colors" />

      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="p-2 bg-purple-100 dark:bg-purple-500/10 rounded-lg border border-purple-200 dark:border-purple-500/20 transition-colors">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 transition-colors" />
        </div>
        <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 transition-colors">
          AI Insight
        </h3>
      </div>

      <div className="relative z-10">
        {!insight ? (
          <div className="flex flex-col items-center justify-center py-8 opacity-70">
            <BrainCircuit className="w-12 h-12 text-purple-400/50 mb-3" />
            <p className="text-purple-700/60 dark:text-purple-200/60 text-sm transition-colors">
              Gathering data to generate your next insight...
            </p>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-200 dark:border-purple-500/10 text-sm transition-colors">
            {insight.content}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default InsightPreview;

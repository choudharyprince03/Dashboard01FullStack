import { motion } from "framer-motion";
import { ListTodo, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const getIconForTitle = (title) => {
  if (title.toLowerCase().includes("total")) return <ListTodo className="w-6 h-6 text-blue-400" />;
  if (title.toLowerCase().includes("completed")) return <CheckCircle className="w-6 h-6 text-green-400" />;
  if (title.toLowerCase().includes("progress")) return <Clock className="w-6 h-6 text-yellow-400" />;
  if (title.toLowerCase().includes("blocked")) return <AlertTriangle className="w-6 h-6 text-red-400" />;
  return <ListTodo className="w-6 h-6 text-gray-400" />;
};

const getGlowColor = (title) => {
  if (title.toLowerCase().includes("total")) return "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]";
  if (title.toLowerCase().includes("completed")) return "group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]";
  if (title.toLowerCase().includes("progress")) return "group-hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]";
  if (title.toLowerCase().includes("blocked")) return "group-hover:shadow-[0_0_20px_rgba(248,113,113,0.3)]";
  return "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]";
};

const StatsCard = ({ title, value }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden bg-white/90 dark:bg-[#121A2F]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-white/5 transition-all duration-300 ${getGlowColor(title)} shadow-sm dark:shadow-none`}
    >
      {/* Background Accent */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-colors duration-500" />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-3 tracking-tight transition-colors">
            {value}
          </h2>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
          {getIconForTitle(title)}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;

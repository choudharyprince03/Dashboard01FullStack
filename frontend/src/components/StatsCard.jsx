import { motion as Motion } from "framer-motion";
import { ListTodo, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const getIconForTitle = (title) => {
  if (title.toLowerCase().includes("total")) return <ListTodo className="w-6 h-6 text-[#6F8FAF]" />;
  if (title.toLowerCase().includes("completed")) return <CheckCircle className="w-6 h-6 text-[#6B8F71]" />;
  if (title.toLowerCase().includes("progress")) return <Clock className="w-6 h-6 text-[#B68A47]" />;
  if (title.toLowerCase().includes("blocked")) return <AlertTriangle className="w-6 h-6 text-[#A7625B]" />;
  return <ListTodo className="w-6 h-6 text-[#8A8F9E]" />;
};

const getGlowColor = (title) => {
  if (title.toLowerCase().includes("total")) return "group-hover:shadow-[0_12px_30px_rgba(111,143,175,0.16)]";
  if (title.toLowerCase().includes("completed")) return "group-hover:shadow-[0_12px_30px_rgba(107,143,113,0.16)]";
  if (title.toLowerCase().includes("progress")) return "group-hover:shadow-[0_12px_30px_rgba(182,138,71,0.14)]";
  if (title.toLowerCase().includes("blocked")) return "group-hover:shadow-[0_12px_30px_rgba(167,98,91,0.14)]";
  return "group-hover:shadow-sm";
};

const StatsCard = ({ title, value }) => {
  return (
    <Motion.div 
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden bg-[#F7F6F2]/95 backdrop-blur-md p-6 rounded-2xl border border-[#D8D3C7] transition-all duration-300 ${getGlowColor(title)} shadow-sm`}
    >
      {/* Background Accent */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#EDEAE2] rounded-full blur-2xl group-hover:bg-[#E3DED2] transition-colors duration-500" />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[#7B8190] text-sm font-medium">{title}</p>
          <h2 className="text-4xl font-bold text-[#2C3040] mt-3 tracking-tight transition-colors">
            {value}
          </h2>
        </div>
        <div className="p-3 bg-[#EDEAE2] rounded-xl border border-[#D8D3C7] group-hover:scale-110 transition-transform duration-300">
          {getIconForTitle(title)}
        </div>
      </div>
    </Motion.div>
  );
};

export default StatsCard;

import { useState, useEffect } from "react";
import { getTasks } from "../api/task.api";
import { getInsights } from "../api/ai.api";
import StatsCard from "../components/StatsCard";
import RecentTasks from "../components/RecentTasks";
import InsightPreview from "../components/InsightPreview";
import TaskStats from "../components/TaskStats";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const taskRes = await getTasks();
        const insightRes = await getInsights();

        setTasks(taskRes.data.tasks);
        setInsight(insightRes.data.insight);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-900 dark:text-white space-y-4 transition-colors">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-500" />
        <p className="text-gray-500 dark:text-gray-400 font-medium transition-colors">Loading your workspace...</p>
      </div>
    );
  }

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const blocked = tasks.filter((t) => t.status === "blocked").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 transition-colors">
            Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Here's what's happening with your projects today.</p>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Tasks" value={total} />
        <StatsCard title="Completed" value={completed} />
        <StatsCard title="In Progress" value={inProgress} />
        <StatsCard title="Blocked" value={blocked} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Recent */}
        <motion.div variants={itemVariants} className="xl:col-span-2 space-y-8">
          <div className="bg-white/80 dark:bg-[#121A2F]/60 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-md dark:shadow-xl transition-colors duration-300">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white transition-colors">Task Distribution</h3>
            <TaskStats tasks={tasks} />
          </div>
          <RecentTasks tasks={tasks.slice(0, 5)} />
        </motion.div>

        {/* Right Column: AI Insights */}
        <motion.div variants={itemVariants} className="xl:col-span-1 h-full">
          <div className="sticky top-6">
            <InsightPreview insight={insight} />
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default Dashboard;
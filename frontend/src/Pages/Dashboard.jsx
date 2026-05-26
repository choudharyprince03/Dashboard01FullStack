import { useState, useEffect } from "react";
import { getTasks } from "../api/task.api";
import { getInsights } from "../api/ai.api";
import StatsCard from "../components/StatsCard";
import InsightPreview from "../components/InsightPreview";
import TaskStats from "../components/TaskStats";
import TaskManager from "../components/Tasks/TaskManager";
import { motion as Motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const refreshInsight = async () => {
    try {
      setIsRefreshing(true);
      const res = await getInsights(true);
      setInsight(res.data.insight);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#2C3040] space-y-4 transition-colors">
        <Loader2 className="w-10 h-10 animate-spin text-[#6B8F71]" />
        <p className="text-[#8A8F9E] font-medium transition-colors">Loading your workspace...</p>
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
    <Motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3040] transition-colors">
            Overview
          </h1>
          <p className="text-[#7B8190] mt-1 transition-colors">Here's what's happening with your projects today.</p>
        </div>
      </div>

      {/* Stats Section */}
      <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Tasks" value={total} />
        <StatsCard title="Completed" value={completed} />
        <StatsCard title="In Progress" value={inProgress} />
        <StatsCard title="Blocked" value={blocked} />
      </Motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Recent */}
        <Motion.div variants={itemVariants} className="xl:col-span-2 space-y-8">
          <div className="bg-[#F7F6F2]/90 backdrop-blur-md p-6 rounded-2xl border border-[#D8D3C7] shadow-sm transition-colors duration-300">
            <h3 className="text-lg font-bold mb-6 text-[#2C3040] transition-colors">Task Distribution</h3>
            <TaskStats tasks={tasks} />
          </div>
          <TaskManager
            tasks={tasks}
            setTasks={setTasks}
            title="Manage Tasks"
            description="Create, update, and clear tasks without leaving the dashboard."
          />
        </Motion.div>

        {/* Right Column: AI Insights */}
        <Motion.div variants={itemVariants} className="xl:col-span-1 h-full">
          <div className="sticky top-6">
            <InsightPreview insight={insight} onRefresh={refreshInsight} isRefreshing={isRefreshing} />
          </div>
        </Motion.div>
      </div>

    </Motion.div>
  );
};

export default Dashboard;

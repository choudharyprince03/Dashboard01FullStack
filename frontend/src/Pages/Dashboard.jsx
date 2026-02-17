import { useState,useEffect } from "react";
import {getTasks} from "../api/task.api"; 
import {getInsights} from '../api/ai.api'; 
import StatsCard from "../components/StatsCard";
import RecentTasks from "../components/RecentTasks";
import InsightPreview from "../components/InsightPreview";

const Dashboard = () => {
    const [tasks,setTasks] = useState([]);
    const [insight,setInsight] = useState(null);
    const [loading,setLoading] = useState(true);  

    useEffect(()=>{
        const loadDashboard =async()=>{
            try {
                const taskRes = await getTasks(); 
                const insightRes = await getInsights(); 

                setTasks(taskRes.data.tasks); 
                setInsight(insightRes.data.insight); 
            } catch (err) {
                console.error(err); 
            }finally{
                setLoading(false); 
            }
        }
        loadDashboard(); 
    },[])

    if(loading){
        return(
            <div className="text-white">Loading dashboard...</div>
        ); 
    }
    const total = tasks.length; 
    const completed = tasks.filter(t=>t.status ==="done").length; 
    const blocked = tasks.filter(t=> t.status==="blocked").length; 
    const inProgress = tasks.filter(t=> t.status==="in-progress").length; 


  return (
    <div className="space-y-6">
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Tasks" value={total} />
        <StatsCard title="Completed" value={completed} />
        <StatsCard title="In Progress" value={inProgress} />
        <StatsCard title="Blocked" value={blocked} />
      </div>

      {/* Recent Tasks */}
      <RecentTasks tasks={tasks.slice(0, 5)} />

      {/* AI Insight */}
      <InsightPreview insight={insight} />

    </div>
  )
}

export default Dashboard
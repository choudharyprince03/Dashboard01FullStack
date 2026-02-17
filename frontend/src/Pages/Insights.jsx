import { useEffect, useState } from "react";
import { getInsights } from "../api/ai.api";
import InsightCard from "../components/InsightsCard";

const Insights = () => {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cached, setCached] = useState(false);
  const [error, setError] = useState("");

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getInsights();

      setInsight(res.data.insight);
      setCached(res.data.cached);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load insights"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  if (loading) {
    return (
      <div className="text-white">
        Generating insights...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <InsightCard
        insight={insight}
        cached={cached}
        onRefresh={loadInsights}
      />
    </div>
  );
};

export default Insights;

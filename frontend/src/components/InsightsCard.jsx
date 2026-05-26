const InsightCard = ({ insight, cached, onRefresh }) => {
  if (!insight) {
    return (
      <div className="bg-[#F7F6F2] p-6 rounded-lg border border-[#D8D3C7] text-[#7B8190]">
        No insights available.
      </div>
    );
  }

  return (
    <div className="bg-[#F7F6F2] p-8 rounded-xl border border-[#D8D3C7] space-y-4 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-[#2C3040] text-xl font-semibold">
          AI Insights
        </h2>

        <div className="flex items-center gap-3">
          {cached && (
            <span className="text-xs px-3 py-1 rounded-full bg-[#F1E3C5] text-[#8A6631] border border-[#E2C995]">
              Cached
            </span>
          )}

          <button
            onClick={onRefresh}
            className="text-sm bg-[#6B8F71] hover:bg-[#5F8065] px-3 py-1 rounded text-white"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="text-[#3D4354] whitespace-pre-line leading-relaxed">
        {insight.content}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-[#7B8190] text-xs">
        <div>
          Generated on:{" "}
          {new Date(insight.createdAt).toLocaleString()}
        </div>
        {insight.modelUsed && (
          <div className="bg-[#E8E6E0] px-2 py-1 rounded-md border border-[#D8D3C7]">
            Powered by: {insight.modelUsed}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCard;

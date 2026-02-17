const InsightCard = ({ insight, cached, onRefresh }) => {
  if (!insight) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-gray-400">
        No insights available.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-white text-xl font-semibold">
          AI Insights
        </h2>

        <div className="flex items-center gap-3">
          {cached && (
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-600 text-white">
              Cached
            </span>
          )}

          <button
            onClick={onRefresh}
            className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="text-gray-300 whitespace-pre-line leading-relaxed">
        {insight.content}
      </div>

      {/* Timestamp */}
      <div className="text-gray-500 text-xs">
        Generated on:{" "}
        {new Date(insight.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default InsightCard;

const InsightPreview = ({ insight }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-white font-semibold mb-4">
        AI Insight
      </h3>

      {!insight ? (
        <p className="text-gray-400 text-sm">
          No insight available yet.
        </p>
      ) : (
        <p className="text-gray-300 whitespace-pre-line">
          {insight.content}
        </p>
      )}
    </div>
  );
};

export default InsightPreview;

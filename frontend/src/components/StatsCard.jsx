const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
};

export default StatsCard;

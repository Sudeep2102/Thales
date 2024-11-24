function SustainabilityScore({ routeData }) {
  const calculateScore = (metric, value) => {
    const reduction = ((routeData.original.emissions[metric] - routeData.optimized.emissions[metric]) / routeData.original.emissions[metric] * 100).toFixed(1);
    return {
      value: reduction,
      label: `${reduction}%`,
      color: reduction > 25 ? 'text-green-600' : reduction > 10 ? 'text-yellow-600' : 'text-red-600'
    };
  };

  const scores = {
    carbon: calculateScore('carbon'),
    energy: calculateScore('energy'),
    water: calculateScore('water')
  };

  const overallScore = (
    (Number(scores.carbon.value) + Number(scores.energy.value) + Number(scores.water.value)) / 3
  ).toFixed(1);

  return (
    <div className="mt-6 bg-blue-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-700">Sustainability Impact</h3>
        <div className="bg-blue-100 px-4 py-2 rounded-full">
          <span className="text-sm text-blue-800 font-medium">Overall Score: </span>
          <span className="text-lg font-bold text-blue-800">{overallScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-900">Carbon Reduction</p>
            <span className={`text-3xl font-bold ${scores.carbon.color}`}>
              {scores.carbon.label}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Reduction in CO2 emissions through optimized routing
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-900">Energy Reduction</p>
            <span className={`text-3xl font-bold ${scores.energy.color}`}>
              {scores.energy.label}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Decrease in energy consumption across transport modes
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-900">Water Reduction</p>
            <span className={`text-3xl font-bold ${scores.water.color}`}>
              {scores.water.label}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Savings in water usage throughout the supply chain
          </p>
        </div>
      </div>
    </div>
  );
}

export default SustainabilityScore;
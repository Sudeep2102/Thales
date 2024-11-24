function RouteMetrics({ route, type }) {
  const bgColor = type === 'original' ? 'bg-red-50' : 'bg-green-50';
  const textColor = type === 'original' ? 'text-red-700' : 'text-green-700';
  const valueColor = type === 'original' ? 'text-red-600' : 'text-green-600';

  return (
    <div className={`${bgColor} p-6 rounded-lg`}>
      <h3 className={`text-lg font-semibold ${textColor} mb-4`}>
        {type === 'original' ? 'Original Route' : 'Optimized Route'}
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Distance</p>
            <p className={`${valueColor} font-medium`}>{route.distance} km</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Transit Time</p>
            <p className={`${valueColor} font-medium`}>{route.time}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 my-4"></div>
        
        <h4 className={`${textColor} font-medium mb-2`}>Environmental Impact</h4>
        <div className="space-y-2">
          <div>
            <p className="text-gray-600 text-sm">Carbon Emissions</p>
            <p className={`${valueColor} font-medium`}>{route.emissions.carbon} kg CO2</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Energy Usage</p>
            <p className={`${valueColor} font-medium`}>{route.emissions.energy} kWh</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Water Usage</p>
            <p className={`${valueColor} font-medium`}>{route.emissions.water} liters</p>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>
        
        <h4 className={`${textColor} font-medium mb-2`}>Additional Metrics</h4>
        <div className="space-y-2">
          <div>
            <p className="text-gray-600 text-sm">Fuel Consumption</p>
            <p className={`${valueColor} font-medium`}>{route.additional.fuel} liters</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Cost</p>
            <p className={`${valueColor} font-medium`}>${route.additional.cost}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Risk Score</p>
            <p className={`${valueColor} font-medium`}>{route.additional.riskScore}/10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteMetrics;
import { useState, useEffect } from 'react';

function WeatherImpact() {
  const [weatherData, setWeatherData] = useState({
    locations: [
      {
        name: 'New York',
        condition: 'Storm',
        impact: 'high',
        facilities: 3,
        delayRisk: '75%'
      },
      {
        name: 'Mumbai',
        condition: 'Heat Wave',
        impact: 'medium',
        facilities: 2,
        delayRisk: '45%'
      },
      {
        name: 'Shanghai',
        condition: 'Rain',
        impact: 'low',
        facilities: 4,
        delayRisk: '25%'
      }
    ]
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Impact Analysis</h3>
      <div className="space-y-4">
        {weatherData.locations.map((location) => (
          <div
            key={location.name}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-medium text-gray-900">
                  {location.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {location.facilities} facilities affected
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  location.impact === 'high'
                    ? 'bg-red-100 text-red-800'
                    : location.impact === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {location.condition}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Delay Risk</span>
                <span className="font-medium text-gray-900">{location.delayRisk}</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    parseInt(location.delayRisk) > 60
                      ? 'bg-red-600'
                      : parseInt(location.delayRisk) > 30
                      ? 'bg-yellow-600'
                      : 'bg-green-600'
                  }`}
                  style={{ width: location.delayRisk }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherImpact;
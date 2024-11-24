import { useState } from 'react';
import RouteMap from '../components/RouteMap';
import RouteMetrics from '../components/RouteMetrics';
import SustainabilityScore from '../components/SustainabilityScore';
import ContainerOptimization from '../components/ContainerOptimization';
import NetworkAnalysis from '../components/NetworkAnalysis';
import { calculateOptimalRoute, calculateDistance, calculateTime, calculateEmissions, calculateFuel, calculateCost } from '../utils/routeCalculations';

// Network analysis data for major Indian logistics hubs
const networkNodes = [
  { lat: 28.6139, lng: 77.2090, name: 'Delhi', type: 'Major Hub' },
  { lat: 19.0760, lng: 72.8777, name: 'Mumbai', type: 'Major Hub' },
  { lat: 13.0827, lng: 80.2707, name: 'Chennai', type: 'Major Hub' },
  { lat: 22.5726, lng: 88.3639, name: 'Kolkata', type: 'Major Hub' },
  { lat: 17.3850, lng: 78.4867, name: 'Hyderabad', type: 'Regional Hub' },
  { lat: 12.9716, lng: 77.5946, name: 'Bangalore', type: 'Regional Hub' },
  { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad', type: 'Regional Hub' },
  { lat: 26.8467, lng: 80.9462, name: 'Lucknow', type: 'Regional Hub' },
  { lat: 20.2961, lng: 85.8245, name: 'Bhubaneswar', type: 'Distribution Center' },
  { lat: 21.1458, lng: 79.0882, name: 'Nagpur', type: 'Distribution Center' },
  { lat: 30.9010, lng: 75.8573, name: 'Ludhiana', type: 'Manufacturing Hub' },
  { lat: 22.3072, lng: 73.1812, name: 'Vadodara', type: 'Manufacturing Hub' }
];

const networkRoutes = networkNodes.flatMap((start, i) => 
  networkNodes.slice(i + 1).map(end => ({
    startLat: start.lat,
    startLng: start.lng,
    endLat: end.lat,
    endLng: end.lng,
    volume: Math.floor(Math.random() * 1000) + 500
  }))
);

function RouteOptimization() {
  const [activeRoute, setActiveRoute] = useState('both');
  const [optimizationFocus, setOptimizationFocus] = useState('balanced');
  const [showTheory, setShowTheory] = useState(false);
  const [routePoints, setRoutePoints] = useState({
    start: { lat: '', lng: '', name: '' },
    midpoints: [],
    end: { lat: '', lng: '', name: '' }
  });
  const [routeData, setRouteData] = useState(null);

  const calculateRouteMetrics = (points) => {
    let totalDistance = 0;
    let path = [];
    
    // Calculate path and distance
    for (let i = 0; i < points.length - 1; i++) {
      const start = [points[i].lng, points[i].lat];
      const end = [points[i + 1].lng, points[i + 1].lat];
      totalDistance += calculateDistance(start, end);
      path.push([points[i].lat, points[i].lng]);
    }
    path.push([points[points.length - 1].lat, points[points.length - 1].lng]);

    const time = calculateTime(totalDistance);
    const emissions = calculateEmissions(totalDistance);
    const fuel = calculateFuel(totalDistance);
    const cost = calculateCost(totalDistance);

    return {
      path,
      distance: Math.round(totalDistance),
      time: `${Math.ceil(time)} hours`,
      emissions: {
        carbon: Math.round(emissions),
        energy: Math.round(emissions * 3.2),
        water: Math.round(emissions * 0.8)
      },
      additional: {
        fuel: Math.round(fuel),
        cost: Math.round(cost),
        riskScore: Math.min(Math.round((totalDistance / 1000) * 1.5), 10)
      }
    };
  };

  const handleRouteCalculation = () => {
    if (!routePoints.start.lat || !routePoints.end.lat) {
      alert('Please enter start and end points');
      return;
    }

    const allPoints = [
      routePoints.start,
      ...routePoints.midpoints,
      routePoints.end
    ].filter(point => point.lat && point.lng);

    const originalRoute = calculateRouteMetrics(allPoints);

    // Calculate optimized route by reordering midpoints
    const midpointsOptimized = [...routePoints.midpoints].sort((a, b) => {
      const distA = calculateDistance(
        [routePoints.start.lng, routePoints.start.lat],
        [a.lng, a.lat]
      );
      const distB = calculateDistance(
        [routePoints.start.lng, routePoints.start.lat],
        [b.lng, b.lat]
      );
      return distA - distB;
    });

    const optimizedPoints = [
      routePoints.start,
      ...midpointsOptimized,
      routePoints.end
    ];

    const optimizedRoute = calculateRouteMetrics(optimizedPoints);

    setRouteData({
      original: originalRoute,
      optimized: optimizedRoute
    });
  };

  const handlePointSelection = (type, index = null) => (e) => {
    const selectedNode = networkNodes.find(node => `${node.lat},${node.lng}` === e.target.value);
    
    if (type === 'start' || type === 'end') {
      setRoutePoints(prev => ({
        ...prev,
        [type]: selectedNode || { lat: '', lng: '', name: '' }
      }));
    } else if (type === 'midpoint' && index !== null) {
      const newMidpoints = [...routePoints.midpoints];
      newMidpoints[index] = selectedNode || { lat: '', lng: '', name: '' };
      setRoutePoints(prev => ({
        ...prev,
        midpoints: newMidpoints
      }));
    }
  };

  const addMidpoint = () => {
    setRoutePoints(prev => ({
      ...prev,
      midpoints: [...prev.midpoints, { lat: '', lng: '', name: '' }]
    }));
  };

  const removeMidpoint = (index) => {
    setRoutePoints(prev => ({
      ...prev,
      midpoints: prev.midpoints.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Indian Supply Chain Route Optimization</h2>
            <p className="mt-1 text-sm text-gray-500">
              Advanced route optimization across major Indian logistics hubs
            </p>
          </div>
          <div className="flex space-x-4">
            <select
              value={activeRoute}
              onChange={(e) => setActiveRoute(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="both">Show Both Routes</option>
              <option value="original">Original Route</option>
              <option value="optimized">Optimized Route</option>
            </select>
            <button
              onClick={() => setShowTheory(!showTheory)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {showTheory ? 'Hide Theory' : 'Show Theory'}
            </button>
          </div>
        </div>

        {showTheory && (
          <div className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Indian Supply Chain Optimization Framework</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium text-gray-900">Network Analysis</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Our model considers:
                  <br />• Major logistics hubs: Delhi, Mumbai, Chennai, Kolkata
                  <br />• Regional distribution centers
                  <br />• Manufacturing clusters
                  <br />• Port connectivity: JNPT, Chennai, Mundra
                </p>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900">Optimization Parameters</h4>
                <p className="text-sm text-gray-600 mt-1">
                  1. Monsoon impact on routes
                  <br />2. State border crossing times
                  <br />3. Infrastructure quality metrics
                  <br />4. Multi-modal transport options
                </p>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900">Constraints</h4>
                <p className="text-sm text-gray-600 mt-1">
                  • Vehicle size restrictions in urban areas
                  <br />• State-specific regulations
                  <br />• Peak hour restrictions
                  <br />• Environmental zones in major cities
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Route Input Section */}
        <div className="mb-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Route Configuration</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Point</label>
                <select
                  value={`${routePoints.start.lat},${routePoints.start.lng}`}
                  onChange={handlePointSelection('start')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select start point</option>
                  {networkNodes.map((node) => (
                    <option key={`start-${node.name}`} value={`${node.lat},${node.lng}`}>
                      {node.name} ({node.type})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Point</label>
                <select
                  value={`${routePoints.end.lat},${routePoints.end.lng}`}
                  onChange={handlePointSelection('end')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select end point</option>
                  {networkNodes.map((node) => (
                    <option key={`end-${node.name}`} value={`${node.lat},${node.lng}`}>
                      {node.name} ({node.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {routePoints.midpoints.map((point, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Midpoint {index + 1}</label>
                  <select
                    value={`${point.lat},${point.lng}`}
                    onChange={handlePointSelection('midpoint', index)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select midpoint</option>
                    {networkNodes.map((node) => (
                      <option key={`mid-${index}-${node.name}`} value={`${node.lat},${node.lng}`}>
                        {node.name} ({node.type})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeMidpoint(index)}
                  className="mt-7 px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex gap-4">
              <button
                onClick={addMidpoint}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
              >
                Add Midpoint
              </button>
              <button
                onClick={handleRouteCalculation}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Calculate Route
              </button>
            </div>
          </div>
        </div>

        {routeData && <RouteMap routeData={routeData} activeRoute={activeRoute} />}

        {routeData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RouteMetrics route={routeData.original} type="original" />
            <RouteMetrics route={routeData.optimized} type="optimized" />
          </div>
        )}

        {routeData && <SustainabilityScore routeData={routeData} />}

        <div className="mt-6">
          <NetworkAnalysis routes={networkRoutes} nodes={networkNodes} />
        </div>

        <div className="mt-6">
          <ContainerOptimization />
        </div>

        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Indian Network Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Network Characteristics</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Network Coverage: 12 major cities</li>
                <li>• Total Route Length: 15,842 km</li>
                <li>• Average Hub Distance: 785 km</li>
                <li>• Critical Connections: 8</li>
                <li>• Resilience Score: 8.5/10</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Regional Optimization</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• North India Hub: Delhi-NCR</li>
                <li>• West India Hub: Mumbai-Pune</li>
                <li>• South India Hub: Chennai</li>
                <li>• East India Hub: Kolkata</li>
                <li>• Central Hub: Nagpur</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Multi-Modal Transportation Analysis</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/km</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO2/km</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reliability</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Road</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹75/km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.92 kg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 km/h</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rail</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹45/km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.28 kg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">55 km/h</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Air</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹250/km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.85 kg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500 km/h</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">95%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-md font-medium text-gray-900 mb-3">Last Mile Delivery Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Delivery Time</span>
                  <span className="text-sm font-medium text-gray-900">65 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Route Density</span>
                  <span className="text-sm font-medium text-gray-900">12.5 stops/km²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Vehicle Utilization</span>
                  <span className="text-sm font-medium text-gray-900">88%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">First Attempt Success Rate</span>
                  <span className="text-sm font-medium text-gray-900">82%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-md font-medium text-gray-900 mb-3">Regional Challenges</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monsoon Impact</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Infrastructure Quality</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Urban Congestion</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Interstate Documentation</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteOptimization;
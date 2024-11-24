import { useState } from 'react';
import { calculateLoadingEfficiency } from '../utils/routeCalculations';

function ContainerOptimization() {
  const [containerDimensions, setContainerDimensions] = useState({
    length: 12, // meters
    width: 2.4, // meters
    height: 2.6, // meters
  });

  const [packages, setPackages] = useState([
    { id: 1, length: 1, width: 1, height: 1, quantity: 100, type: 'Standard' },
    { id: 2, length: 2, width: 1.5, height: 1.2, quantity: 50, type: 'Large' },
    { id: 3, length: 0.5, width: 0.5, height: 0.5, quantity: 200, type: 'Small' },
  ]);

  const efficiency = calculateLoadingEfficiency(containerDimensions, packages);

  const handlePackageUpdate = (id, field, value) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, [field]: parseFloat(value) || 0 } : pkg
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Container Loading Optimization</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">Container Dimensions</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Length (m)</label>
              <input
                type="number"
                value={containerDimensions.length}
                onChange={(e) => setContainerDimensions({
                  ...containerDimensions,
                  length: parseFloat(e.target.value) || 0
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Width (m)</label>
              <input
                type="number"
                value={containerDimensions.width}
                onChange={(e) => setContainerDimensions({
                  ...containerDimensions,
                  width: parseFloat(e.target.value) || 0
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Height (m)</label>
              <input
                type="number"
                value={containerDimensions.height}
                onChange={(e) => setContainerDimensions({
                  ...containerDimensions,
                  height: parseFloat(e.target.value) || 0
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">Loading Efficiency</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Space Utilization</span>
              <span className="text-lg font-bold text-blue-600">{efficiency.toFixed(1)}%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">Package Configuration</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length (m)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Width (m)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height (m)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pkg.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={pkg.length}
                      onChange={(e) => handlePackageUpdate(pkg.id, 'length', e.target.value)}
                      className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={pkg.width}
                      onChange={(e) => handlePackageUpdate(pkg.id, 'width', e.target.value)}
                      className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={pkg.height}
                      onChange={(e) => handlePackageUpdate(pkg.id, 'height', e.target.value)}
                      className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={pkg.quantity}
                      onChange={(e) => handlePackageUpdate(pkg.id, 'quantity', e.target.value)}
                      className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-blue-900 mb-2">Optimization Tips</h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
          <li>Place heavier packages at the bottom for stability</li>
          <li>Utilize vertical space efficiently by stacking compatible items</li>
          <li>Consider package orientation for optimal space usage</li>
          <li>Leave adequate space for ventilation and handling</li>
        </ul>
      </div>
    </div>
  );
}

export default ContainerOptimization;
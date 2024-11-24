import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function CarbonCalculator() {
  const [formData, setFormData] = useState({
    // Transportation
    roadFreightDistance: '',
    airFreightDistance: '',
    oceanFreightDistance: '',
    railFreightDistance: '',
    
    // Energy
    electricityUsage: '',
    naturalGasUsage: '',
    fuelOilUsage: '',
    
    // Materials
    rawMaterialsWeight: '',
    packagingWeight: '',
    wasteGenerated: '',
    
    // Facilities
    officeSpace: '',
    warehouseSpace: '',
    manufacturingSpace: '',
    
    // Water
    waterConsumption: '',
  });

  const [results, setResults] = useState(null);

  const emissionFactors = {
    road: 0.1, // kg CO2e per ton-km
    air: 0.5,
    ocean: 0.015,
    rail: 0.03,
    electricity: 0.5, // kg CO2e per kWh
    naturalGas: 2.1, // kg CO2e per m3
    fuelOil: 2.7, // kg CO2e per liter
    materials: 3, // kg CO2e per kg
    packaging: 2,
    waste: 0.5,
    space: 0.1, // kg CO2e per m2
    water: 0.3, // kg CO2e per m3
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEmissions = () => {
    const transportEmissions = (
      formData.roadFreightDistance * emissionFactors.road +
      formData.airFreightDistance * emissionFactors.air +
      formData.oceanFreightDistance * emissionFactors.ocean +
      formData.railFreightDistance * emissionFactors.rail
    );

    const energyEmissions = (
      formData.electricityUsage * emissionFactors.electricity +
      formData.naturalGasUsage * emissionFactors.naturalGas +
      formData.fuelOilUsage * emissionFactors.fuelOil
    );

    const materialEmissions = (
      formData.rawMaterialsWeight * emissionFactors.materials +
      formData.packagingWeight * emissionFactors.packaging +
      formData.wasteGenerated * emissionFactors.waste
    );

    const facilityEmissions = (
      (Number(formData.officeSpace) +
      Number(formData.warehouseSpace) +
      Number(formData.manufacturingSpace)) * emissionFactors.space
    );

    const waterEmissions = formData.waterConsumption * emissionFactors.water;

    const totalEmissions = transportEmissions + energyEmissions + materialEmissions + facilityEmissions + waterEmissions;

    setResults({
      total: totalEmissions,
      breakdown: [
        { name: 'Transportation', value: transportEmissions },
        { name: 'Energy', value: energyEmissions },
        { name: 'Materials', value: materialEmissions },
        { name: 'Facilities', value: facilityEmissions },
        { name: 'Water', value: waterEmissions },
      ],
      intensity: totalEmissions / (Number(formData.rawMaterialsWeight) || 1),
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supply Chain Carbon Footprint Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Transportation */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transportation</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Road Freight (ton-km)</label>
                  <input
                    type="number"
                    name="roadFreightDistance"
                    value={formData.roadFreightDistance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Air Freight (ton-km)</label>
                  <input
                    type="number"
                    name="airFreightDistance"
                    value={formData.airFreightDistance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ocean Freight (ton-km)</label>
                  <input
                    type="number"
                    name="oceanFreightDistance"
                    value={formData.oceanFreightDistance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rail Freight (ton-km)</label>
                  <input
                    type="number"
                    name="railFreightDistance"
                    value={formData.railFreightDistance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Energy */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Energy Consumption</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Electricity (kWh)</label>
                  <input
                    type="number"
                    name="electricityUsage"
                    value={formData.electricityUsage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Natural Gas (m³)</label>
                  <input
                    type="number"
                    name="naturalGasUsage"
                    value={formData.naturalGasUsage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fuel Oil (L)</label>
                  <input
                    type="number"
                    name="fuelOilUsage"
                    value={formData.fuelOilUsage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Materials</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Raw Materials (kg)</label>
                  <input
                    type="number"
                    name="rawMaterialsWeight"
                    value={formData.rawMaterialsWeight}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Packaging (kg)</label>
                  <input
                    type="number"
                    name="packagingWeight"
                    value={formData.packagingWeight}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Waste Generated (kg)</label>
                  <input
                    type="number"
                    name="wasteGenerated"
                    value={formData.wasteGenerated}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Facilities */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Facilities</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Office Space (m²)</label>
                  <input
                    type="number"
                    name="officeSpace"
                    value={formData.officeSpace}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Warehouse Space (m²)</label>
                  <input
                    type="number"
                    name="warehouseSpace"
                    value={formData.warehouseSpace}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Manufacturing Space (m²)</label>
                  <input
                    type="number"
                    name="manufacturingSpace"
                    value={formData.manufacturingSpace}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Water */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Water Usage</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Water Consumption (m³)</label>
                <input
                  type="number"
                  name="waterConsumption"
                  value={formData.waterConsumption}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={calculateEmissions}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Calculate Carbon Footprint
              </button>
            </div>
          </div>
        </div>

        {results && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Total Emissions</h4>
                <p className="text-3xl font-bold text-blue-600">{results.total.toFixed(2)} kg CO2e</p>
                <p className="mt-2 text-sm text-gray-600">Carbon Intensity: {results.intensity.toFixed(2)} kg CO2e/kg product</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Emissions Breakdown</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.breakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                      >
                        {results.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow">
              <h4 className="text-md font-medium text-gray-900 mb-4">Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.breakdown.map((category, index) => {
                  const percentage = (category.value / results.total) * 100;
                  return percentage > 20 ? (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-medium text-yellow-800">{category.name} Reduction</h5>
                      <p className="mt-2 text-sm text-yellow-700">
                        {category.name === 'Transportation' && 'Consider optimizing routes and using more efficient vehicles'}
                        {category.name === 'Energy' && 'Implement energy efficiency measures and consider renewable sources'}
                        {category.name === 'Materials' && 'Optimize material usage and consider recycled materials'}
                        {category.name === 'Facilities' && 'Improve building efficiency and implement smart systems'}
                        {category.name === 'Water' && 'Implement water conservation measures and recycling systems'}
                      </p>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarbonCalculator;
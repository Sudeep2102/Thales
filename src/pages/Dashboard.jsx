import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import {
  LineChart,
  Line,
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
import RiskAlert from '../components/RiskAlert';
import DataImport from '../components/DataImport';
import WeatherImpact from '../components/WeatherImpact';
import SustainabilityGauge from '../components/SustainabilityGauge';
import SupplierCompliance from '../components/SupplierCompliance';
import CarbonCredits from '../components/CarbonCredits';
import { getCurrentData, exportData } from '../data/environmentalData';

function Dashboard() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [exportFormat, setExportFormat] = useState('csv');
  const [environmentalData, setEnvironmentalData] = useState(getCurrentData());
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const handleDataUpdate = () => {
      setEnvironmentalData(getCurrentData());
    };
    
    window.addEventListener('environmentalDataUpdate', handleDataUpdate);
    return () => window.removeEventListener('environmentalDataUpdate', handleDataUpdate);
  }, []);

  const handleExport = () => {
    const blob = exportData(exportFormat);
    saveAs(blob, `environmental-data.${exportFormat}`);
  };

  const metrics = [
    {
      title: 'Carbon Emissions',
      value: Math.round(environmentalData.reduce((acc, item) => acc + item["Product's carbon footprint (PCF, kg CO2e)"], 0) / environmentalData.length),
      unit: 'kg CO2e',
      change: '-12%',
      trend: 'decrease',
    },
    {
      title: 'Energy Usage',
      value: Math.round(environmentalData.reduce((acc, item) => acc + item["Energy Consumption (kWh)"], 0) / environmentalData.length),
      unit: 'kWh',
      change: '-8%',
      trend: 'decrease',
    },
    {
      title: 'Waste Generated',
      value: Math.round(environmentalData.reduce((acc, item) => acc + item["Waste Consumption (kg)"], 0) / environmentalData.length),
      unit: 'kg',
      change: '+2%',
      trend: 'increase',
    },
  ];

  const risks = [
    {
      id: 1,
      severity: 'high',
      message: 'Supplier A has exceeded carbon emission limits by 25%. Immediate action required.',
    },
    {
      id: 2,
      severity: 'medium',
      message: 'Potential supply chain disruption: 3 suppliers in region X affected by new environmental regulations.',
    },
    {
      id: 3,
      severity: 'low',
      message: 'Minor delay in sustainability report submissions from 2 suppliers.',
    },
  ];

  const sustainabilityInitiatives = [
    { name: 'Renewable Energy', progress: 75, target: 100 },
    { name: 'Waste Reduction', progress: 60, target: 80 },
    { name: 'Water Conservation', progress: 85, target: 90 },
    { name: 'Green Packaging', progress: 45, target: 70 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Sustainability Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <option value="csv">CSV</option>
            <option value="xlsx">Excel</option>
            <option value="pdf">PDF</option>
          </select>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Data
          </button>
          <DataImport />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'compliance', 'initiatives', 'credits'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Risk Alerts Section */}
      <div className="mt-8 space-y-4">
        {risks.map((risk) => (
          <RiskAlert key={risk.id} risk={risk} />
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.title}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 truncate">
                        {metric.title}
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">
                        {metric.value.toLocaleString()}
                        <span className="ml-1 text-sm font-medium text-gray-500">
                          {metric.unit}
                        </span>
                      </p>
                    </div>
                    <div
                      className={`${
                        metric.trend === 'decrease'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      } inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium`}
                    >
                      {metric.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WeatherImpact />
            <SustainabilityGauge score={61} />
          </div>
        </>
      )}

      {activeTab === 'compliance' && (
        <div className="mt-8">
          <SupplierCompliance />
        </div>
      )}

      {activeTab === 'initiatives' && (
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Sustainability Initiatives Progress</h3>
          <div className="space-y-6">
            {sustainabilityInitiatives.map((initiative) => (
              <div key={initiative.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{initiative.name}</span>
                  <span className="text-sm text-gray-500">
                    {initiative.progress}% of {initiative.target}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(initiative.progress / initiative.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'credits' && (
        <div className="mt-8">
          <CarbonCredits />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
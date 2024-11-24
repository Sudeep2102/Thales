import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { getCurrentData } from '../data/environmentalData';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function Analytics() {
  const [timeframe, setTimeframe] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [pieChartMetric, setPieChartMetric] = useState('carbon');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  const [environmentalData, setEnvironmentalData] = useState(getCurrentData());
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState('carbon');

  useEffect(() => {
    const handleDataUpdate = () => {
      setEnvironmentalData(getCurrentData());
    };
    
    window.addEventListener('environmentalDataUpdate', handleDataUpdate);
    return () => window.removeEventListener('environmentalDataUpdate', handleDataUpdate);
  }, []);

  // ESG metrics data
  const esgData = {
    environmental: {
      carbonEmissions: 125000,
      waterUsage: 850000,
      wasteGenerated: 75000,
      renewableEnergy: 35,
      recyclingRate: 68
    },
    social: {
      employeeSatisfaction: 85,
      communityInvestment: 2500000,
      diversityScore: 78,
      healthSafetyIncidents: 12,
      trainingHours: 45000
    },
    governance: {
      boardDiversity: 42,
      ethicsViolations: 3,
      transparencyScore: 89,
      riskManagementScore: 92,
      complianceRate: 98
    }
  };

  // Circular Economy Metrics
  const circularEconomyData = [
    { name: 'Raw Materials', traditional: 100, circular: 60 },
    { name: 'Manufacturing', traditional: 85, circular: 45 },
    { name: 'Distribution', traditional: 70, circular: 35 },
    { name: 'Consumption', traditional: 60, circular: 30 },
    { name: 'Waste', traditional: 50, circular: 15 },
    { name: 'Recycling', traditional: 20, circular: 85 }
  ];

  // SDG Impact Data
  const sdgImpactData = [
    { subject: 'SDG 12: Responsible Consumption', A: 120, fullMark: 150 },
    { subject: 'SDG 13: Climate Action', A: 98, fullMark: 150 },
    { subject: 'SDG 9: Industry & Innovation', A: 86, fullMark: 150 },
    { subject: 'SDG 8: Decent Work', A: 99, fullMark: 150 },
    { subject: 'SDG 6: Clean Water', A: 85, fullMark: 150 },
    { subject: 'SDG 7: Clean Energy', A: 65, fullMark: 150 },
  ];

  // Greenwashing Risk Indicators
  const greenwashingRiskData = [
    { name: 'Vague Claims', value: 35 },
    { name: 'Hidden Trade-offs', value: 25 },
    { name: 'No Proof', value: 20 },
    { name: 'Irrelevance', value: 15 },
    { name: 'Lesser of Evils', value: 5 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Calculate sustainability score
  const calculateSustainabilityScore = () => {
    const weights = {
      environmental: 0.4,
      social: 0.3,
      governance: 0.3
    };

    const environmentalScore = (
      (esgData.environmental.renewableEnergy / 100) * 0.3 +
      (esgData.environmental.recyclingRate / 100) * 0.3 +
      (1 - (esgData.environmental.carbonEmissions / 200000)) * 0.4
    ) * 100;

    const socialScore = (
      (esgData.social.employeeSatisfaction / 100) * 0.3 +
      (esgData.social.diversityScore / 100) * 0.3 +
      (1 - (esgData.social.healthSafetyIncidents / 20)) * 0.4
    ) * 100;

    const governanceScore = (
      (esgData.governance.boardDiversity / 100) * 0.3 +
      (esgData.governance.transparencyScore / 100) * 0.3 +
      (esgData.governance.complianceRate / 100) * 0.4
    ) * 100;

    return Math.round(
      environmentalScore * weights.environmental +
      socialScore * weights.social +
      governanceScore * weights.governance
    );
  };

  // Calculate sustainability score for each company
  const calculateCompanySustainabilityScore = (company) => {
    const metrics = {
      emissions: company["Product's carbon footprint (PCF, kg CO2e)"],
      energy: company["Energy Consumption (kWh)"],
      waste: company["Waste Consumption (kg)"]
    };

    const weights = { emissions: 0.4, energy: 0.35, waste: 0.25 };
    const maxValues = {
      emissions: Math.max(...environmentalData.map(d => d["Product's carbon footprint (PCF, kg CO2e)"])),
      energy: Math.max(...environmentalData.map(d => d["Energy Consumption (kWh)"])),
      waste: Math.max(...environmentalData.map(d => d["Waste Consumption (kg)"]))
    };

    let score = 0;
    for (const [key, value] of Object.entries(metrics)) {
      const normalizedValue = 1 - (value / maxValues[key]);
      score += normalizedValue * weights[key];
    }

    return Math.round(score * 100);
  };

  const processedData = environmentalData.map(item => ({
    ...item,
    sustainabilityScore: calculateCompanySustainabilityScore(item)
  }));

  const topPerformers = [...processedData]
    .sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
    .slice(0, 5);

  // Fetch suggestions from Gemini API
  useEffect(() => {
    const fetchSuggestions = async () => {
      const summary = calculateSummary();
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Analyze this environmental data and provide 3 specific, actionable recommendations:

        Environmental Metrics Summary:
        - Average Carbon Emissions: ${summary.emissions} kg CO2e
        - Average Energy Consumption: ${summary.energy} kWh
        - Average Waste Production: ${summary.waste} kg

        Additional Context:
        - Data spans multiple years and companies
        - Includes manufacturing and technology sectors
        - Focus on practical, implementable solutions

        For each recommendation, provide:
        1. A clear, specific action title
        2. Detailed implementation steps
        3. Expected impact level (High/Medium/Low)
        4. Estimated timeframe for implementation
        5. Key performance indicators to track

        Format each recommendation clearly and focus on the metrics showing concerning trends.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse the response into structured recommendations
        const recommendations = text.split('\n\n').slice(0, 3).map(rec => {
          const lines = rec.split('\n');
          return {
            title: lines[0].replace(/^\d+\.\s*/, '').trim(),
            description: lines.slice(1, -2).join(' ').trim(),
            impact: lines[lines.length - 2].toLowerCase().includes('high') ? 'high' : 
                   lines[lines.length - 2].toLowerCase().includes('medium') ? 'medium' : 'low',
            timeframe: lines[lines.length - 1].trim()
          };
        });

        setSuggestions(recommendations);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([
          {
            title: 'Optimize Manufacturing Processes',
            description: 'Implement lean manufacturing principles and upgrade to energy-efficient equipment.',
            impact: 'high',
            timeframe: '6-12 months'
          },
          {
            title: 'Enhanced Waste Management',
            description: 'Develop comprehensive recycling programs and reduce packaging waste.',
            impact: 'medium',
            timeframe: '3-6 months'
          },
          {
            title: 'Supply Chain Optimization',
            description: 'Partner with environmentally conscious suppliers and optimize logistics.',
            impact: 'medium',
            timeframe: '6-9 months'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  // Process data for yearly averages
  const yearlyAverages = environmentalData.reduce((acc, item) => {
    const year = item['Year of reporting'];
    if (!acc[year]) {
      acc[year] = {
        year,
        emissions: 0,
        energy: 0,
        waste: 0,
        count: 0,
      };
    }
    acc[year].emissions += item["Product's carbon footprint (PCF, kg CO2e)"];
    acc[year].energy += item["Energy Consumption (kWh)"];
    acc[year].waste += item["Waste Consumption (kg)"];
    acc[year].count += 1;
    return acc;
  }, {});

  // Convert to array and calculate averages
  const yearlyData = Object.values(yearlyAverages)
    .map((item) => ({
      name: item.year.toString(),
      emissions: Math.round(item.emissions / item.count),
      energy: Math.round(item.energy / item.count),
      waste: Math.round(item.waste / item.count),
    }))
    .sort((a, b) => a.name - b.name);

  // Calculate metrics by company
  const companyMetrics = environmentalData.reduce((acc, item) => {
    const company = item.Company;
    if (!acc[company]) {
      acc[company] = {
        carbon: 0,
        energy: 0,
        waste: 0,
      };
    }
    acc[company].carbon += item["Product's carbon footprint (PCF, kg CO2e)"];
    acc[company].energy += item["Energy Consumption (kWh)"];
    acc[company].waste += item["Waste Consumption (kg)"];
    return acc;
  }, {});

  // Get pie chart data based on selected metric
  const getPieData = () => {
    const metricKey = {
      carbon: 'carbon',
      energy: 'energy',
      waste: 'waste',
    }[pieChartMetric];

    const metricUnit = {
      carbon: 'kg CO2e',
      energy: 'kWh',
      waste: 'kg',
    }[pieChartMetric];

    return Object.entries(companyMetrics)
      .map(([name, metrics]) => ({
        name,
        value: metrics[metricKey],
        unit: metricUnit,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  // Calculate summary statistics
  const calculateSummary = () => {
    const average = (key) => {
      const sum = environmentalData.reduce((acc, item) => {
        switch (key) {
          case 'emissions':
            return acc + item["Product's carbon footprint (PCF, kg CO2e)"];
          case 'energy':
            return acc + item["Energy Consumption (kWh)"];
          case 'waste':
            return acc + item["Waste Consumption (kg)"];
          default:
            return acc;
        }
      }, 0);
      return Math.round(sum / environmentalData.length);
    };

    return {
      emissions: average('emissions'),
      energy: average('energy'),
      waste: average('waste'),
    };
  };

  const summary = calculateSummary();
  const pieData = getPieData();

  // Custom label component for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value, unit }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const textAnchor = x > cx ? 'start' : 'end';

    return (
      <g>
        <text
          x={x}
          y={y}
          textAnchor={textAnchor}
          fill="#666"
          dominantBaseline="central"
          fontSize="12"
        >
          {`${name}`}
        </text>
        <text
          x={x}
          y={y + 15}
          textAnchor={textAnchor}
          fill="#999"
          dominantBaseline="central"
          fontSize="10"
        >
          {`${value.toLocaleString()} ${unit}`}
        </text>
      </g>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Environmental Analytics Dashboard</h2>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <option value="all">All Metrics</option>
          <option value="emissions">Emissions</option>
          <option value="energy">Energy</option>
          <option value="waste">Waste</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Yearly Environmental Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {filterType === 'all' || filterType === 'emissions' ? (
                <Bar dataKey="emissions" fill="#3B82F6" name="Carbon Footprint (kg CO2e)" />
              ) : null}
              {filterType === 'all' || filterType === 'energy' ? (
                <Bar dataKey="energy" fill="#10B981" name="Energy (kWh)" />
              ) : null}
              {filterType === 'all' || filterType === 'waste' ? (
                <Bar dataKey="waste" fill="#F59E0B" name="Waste (kg)" />
              ) : null}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top 5 Companies by Metric</h3>
            <select
              value={pieChartMetric}
              onChange={(e) => setPieChartMetric(e.target.value)}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <option value="carbon">Carbon Footprint</option>
              <option value="energy">Energy Consumption</option>
              <option value="waste">Waste Production</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value.toLocaleString()} ${props.payload.unit}`, name]} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Top Performing Companies */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Top Performing Companies</h3>
          <button
            onClick={() => setShowScoreInfo(!showScoreInfo)}
            className="text-gray-400 hover:text-gray-500"
            title="Sustainability Score Information"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {showScoreInfo && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">About Sustainability Score</h4>
            <p className="text-sm text-blue-700">
              The sustainability score is calculated using a weighted average of three key metrics:
              <br />- Carbon Emissions (40% weight)
              <br />- Energy Consumption (35% weight)
              <br />- Waste Generation (25% weight)
              <br /><br />
              Each metric is normalized against the highest value in the dataset and inverted so that lower environmental impact results in a higher score. The final score ranges from 0 to 100, where 100 represents the best possible environmental performance.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {topPerformers.map((company, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow">
              <h4 className="font-medium text-gray-900 truncate">{company.Company}</h4>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">
                  Carbon: {company["Product's carbon footprint (PCF, kg CO2e)"]} kg CO2e
                </p>
                <p className="text-sm text-gray-600">
                  Energy: {company["Energy Consumption (kWh)"]} kWh
                </p>
                <p className="text-sm text-gray-600">
                  Waste: {company["Waste Consumption (kg)"]} kg
                </p>
                <div className="mt-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">Score:</span>
                    <span className="ml-2 text-sm font-medium text-blue-600">
                      {company.sustainabilityScore}/100
                    </span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${company.sustainabilityScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-blue-800 font-medium">Average Carbon Footprint</h4>
              <p className="text-2xl font-bold text-blue-900">{summary.emissions.toLocaleString()} kg CO2e</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-green-800 font-medium">Average Energy Consumption</h4>
              <p className="text-2xl font-bold text-green-900">{summary.energy.toLocaleString()} kWh</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-yellow-800 font-medium">Average Waste Production</h4>
              <p className="text-2xl font-bold text-yellow-900">{summary.waste.toLocaleString()} kg</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Supply Chain Sustainability Hub */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text- text-gray-900">Supply Chain Sustainability Hub</h1>
                <p className="mt-2 text-gray-600">
                  Comprehensive analysis and insights for sustainable supply chain management
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Sustainability Score</p>
                <p className="text-3xl font-bold text-blue-600">{calculateSustainabilityScore()}/100</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {['overview', 'circular', 'sdgs', 'esg', 'greenwashing'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="p-6">
            {/* Overview Section */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Supply Chain Sustainability Overview
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Our comprehensive approach to supply chain sustainability integrates environmental stewardship,
                    social responsibility, and economic prosperity. We leverage data analytics and AI to optimize
                    operations while minimizing environmental impact.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Environmental Impact</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Carbon Emissions</span>
                          <span className="font-medium">{esgData.environmental.carbonEmissions.toLocaleString()} tons</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Water Usage</span>
                          <span className="font-medium">{esgData.environmental.waterUsage.toLocaleString()} m³</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Renewable Energy</span>
                          <span className="font-medium">{esgData.environmental.renewableEnergy}%</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Social Impact</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Employee Satisfaction</span>
                          <span className="font-medium">{esgData.social.employeeSatisfaction}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Community Investment</span>
                          <span className="font-medium">${(esgData.social.communityInvestment/1000000).toFixed(1)}M</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Training Hours</span>
                          <span className="font-medium">{esgData.social.trainingHours.toLocaleString()}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Governance</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Transparency Score</span>
                          <span className="font-medium">{esgData.governance.transparencyScore}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Compliance Rate</span>
                          <span className="font-medium">{esgData.governance.complianceRate}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Risk Management</span>
                          <span className="font-medium">{esgData.governance.riskManagementScore}/100</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Sustainability Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={circularEconomyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="traditional" stroke="#8884d8" name="Traditional Model" />
                        <Line type="monotone" dataKey="circular" stroke="#82ca9d" name="Circular Model" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Circular Economy Section */}
            {activeTab === 'circular' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Circular Economy Implementation
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Our circular economy model focuses on minimizing waste, maximizing resource efficiency,
                    and creating closed-loop systems throughout our supply chain.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Flow Analysis</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={circularEconomyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="traditional" fill="#8884d8" name="Traditional Model" />
                            <Bar dataKey="circular" fill="#82ca9d" name="Circular Model" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Circular Initiatives</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium text-gray-900">Design for Circularity</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Products designed for easy disassembly, repair, and recycling
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-medium text-gray-900">Reverse Logistics</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Efficient collection and processing of end-of-life products
                          </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-medium text-gray-900">Material Recovery</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Advanced recycling technologies for material reclamation
                          </p>
                        </div>
                        <div className="border-l-4 border-yellow-500 pl-4">
                          <h4 className="font-medium text-gray-900">Waste Reduction</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Zero-waste manufacturing and packaging initiatives
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SDGs Section */}
            {activeTab === 'sdgs' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    SDG Impact Assessment
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Our contribution to the UN Sustainable Development Goals through supply chain innovations
                    and sustainable practices.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">SDG Performance Radar</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={sdgImpactData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Radar name="SDG Progress" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Key SDG Initiatives</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900">SDG 12: Responsible Consumption</h4>
                          <ul className="mt-2 space-y-2 text-blue-800">
                            <li>• Sustainable packaging initiatives</li>
                            <li>• Waste reduction programs</li>
                            <li>• Circular economy implementation</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-900">SDG 13: Climate Action</h4>
                          <ul className="mt-2 space-y-2 text-green-800">
                            <li>• Carbon reduction strategies</li>
                            <li>• Renewable energy adoption</li>
                            <li>• Climate resilient operations</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-medium text-purple-900">SDG 9: Industry & Innovation</h4>
                          <ul className="mt-2 space-y-2 text-purple-800">
                            <li>• Smart manufacturing</li>
                            <li>• Digital transformation</li>
                            <li>• Sustainable infrastructure</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ESG Section */}
            {activeTab === 'esg' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    ESG Performance Metrics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-green-600 mb-4">Environmental</h3>
                      <ul className="space-y-3">
                        {Object.entries(esgData.environmental).map(([key, value]) => (
                          <li key={key} className="flex justify-between items-center">
                            <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium">{typeof value === 'number' ? value.toLocaleString() : value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-blue-600 mb-4">Social</h3>
                      <ul className="space-y-3">
                        {Object.entries(esgData.social).map(([key, value]) => (
                          <li key={key} className="flex justify-between items-center">
                            <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium">{typeof value === 'number' ? value.toLocaleString() : value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-purple-600 mb-4">Governance</h3>
                      <ul className="space-y-3">
                        {Object.entries(esgData.governance).map(([key, value]) => (
                          <li key={key} className="flex justify-between items-center">
                            <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium">{typeof value === 'number' ? value.toLocaleString() : value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Greenwashing Prevention Section */}
            {activeTab === 'greenwashing' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Greenwashing Risk Analysis
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Monitoring and preventing greenwashing through data-driven analysis and transparent reporting.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Distribution</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={greenwashingRiskData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {greenwashingRiskData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Prevention Measures</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg">
                          <h4 className="font-medium text-red-900">High-Risk Areas</h4>
                          <ul className="mt-2 space-y-2 text-red-800">
                            <li>• Vague environmental claims</li>
                            <li>• Unsubstantiated benefits</li>
                            <li>• Misleading certifications</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-900">Mitigation Strategies</h4>
                          <ul className="mt-2 space-y-2 text-green-800">
                            <li>• Third-party verification</li>
                            <li>• Transparent reporting</li>
                            <li>• Data-backed claims</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900">Monitoring Tools</h4>
                          <ul className="mt-2 space-y-2 text-blue-800">
                            <li>• AI-powered claim analysis</li>
                            <li>• Regular audits</li>
                            <li>• Stakeholder feedback</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            AI-Generated Improvement Suggestions
            {loading && <span className="ml-2 text-sm text-gray-500">(Loading...)</span>}
          </h3>
          <div className="space-y-6">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900">{suggestion.title}</h4>
                <p className="mt-2 text-gray-700">{suggestion.description}</p>
                <div className="mt-3 flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    suggestion.impact === 'high' 
                      ? 'bg-red-100 text-red-800'
                      : suggestion.impact === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    Impact: {suggestion.impact.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    Timeline: {suggestion.timeframe}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Analytics;
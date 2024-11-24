import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import DataImport from '../components/DataImport';

function Reports() {
  const [reportType, setReportType] = useState('environmental');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(false);

  // Sample data - In a real app, this would come from your backend
  const environmentalData = {
    emissions: [
      { month: 'Jan', value: 2500 },
      { month: 'Feb', value: 2300 },
      { month: 'Mar', value: 2100 },
      { month: 'Apr', value: 2400 },
      { month: 'May', value: 2200 },
      { month: 'Jun', value: 2000 },
    ],
    energy: [
      { month: 'Jan', value: 45000 },
      { month: 'Feb', value: 42000 },
      { month: 'Mar', value: 43500 },
      { month: 'Apr', value: 44000 },
      { month: 'May', value: 41000 },
      { month: 'Jun', value: 40000 },
    ],
    waste: [
      { month: 'Jan', value: 1200 },
      { month: 'Feb', value: 1150 },
      { month: 'Mar', value: 1100 },
      { month: 'Apr', value: 1050 },
      { month: 'May', value: 1000 },
      { month: 'Jun', value: 950 },
    ],
  };

  const supplierData = {
    compliance: [
      { name: 'Fully Compliant', value: 65 },
      { name: 'Partially Compliant', value: 25 },
      { name: 'Non-Compliant', value: 10 },
    ],
    risks: [
      { category: 'Environmental', level: 'High', count: 3 },
      { category: 'Social', level: 'Medium', count: 5 },
      { category: 'Governance', level: 'Low', count: 2 },
    ],
  };

  const sustainabilityScores = {
    overall: 78,
    categories: [
      { name: 'Carbon Footprint', score: 82 },
      { name: 'Energy Efficiency', score: 75 },
      { name: 'Waste Management', score: 80 },
      { name: 'Water Usage', score: 85 },
      { name: 'Supply Chain', score: 70 },
    ],
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const generatePDF = () => {
    setLoading(true);
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text('Environmental Impact Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 30);

    // Summary Section
    doc.setFontSize(16);
    doc.text('Executive Summary', 20, 45);
    doc.setFontSize(12);
    doc.text(
      [
        'This report provides a comprehensive analysis of environmental performance,',
        'sustainability metrics, and compliance status for the reporting period.',
      ],
      20,
      55
    );

    // Key Metrics
    doc.setFontSize(16);
    doc.text('Key Performance Indicators', 20, 80);

    const metrics = [
      ['Metric', 'Current Value', 'Change'],
      ['Carbon Emissions', '2000 kg CO2e', '-12%'],
      ['Energy Usage', '40000 kWh', '-8%'],
      ['Waste Generated', '950 kg', '-15%'],
      ['Water Consumption', '15000 L', '-5%'],
    ];

    doc.autoTable({
      startY: 85,
      head: [metrics[0]],
      body: metrics.slice(1),
      theme: 'grid',
    });

    // Sustainability Score
    doc.setFontSize(16);
    doc.text('Sustainability Score Breakdown', 20, 140);

    const scores = sustainabilityScores.categories.map((cat) => [
      cat.name,
      `${cat.score}/100`,
    ]);

    doc.autoTable({
      startY: 145,
      head: [['Category', 'Score']],
      body: scores,
      theme: 'striped',
    });

    // Recommendations
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Recommendations', 20, 20);

    const recommendations = [
      'Implement energy efficiency measures in manufacturing processes',
      'Optimize supply chain routes to reduce transportation emissions',
      'Enhance waste recycling programs',
      'Invest in renewable energy sources',
      'Improve water conservation practices',
    ];

    let yPos = 30;
    recommendations.forEach((rec, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${rec}`, 20, yPos);
      yPos += 10;
    });

    // Save the PDF
    doc.save(`environmental-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sustainability Reports</h1>
        <div className="flex space-x-4">
          <button
            onClick={generatePDF}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Environmental Metrics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">
            Environmental Performance Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={environmentalData.emissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  name="Carbon Emissions (kg CO2e)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sustainability Scores */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">
            Sustainability Category Scores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sustainabilityScores.categories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={supplierData.compliance}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {supplierData.compliance.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Key Findings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">
                Improvements
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-green-700">
                <li>12% reduction in carbon emissions</li>
                <li>8% decrease in energy consumption</li>
                <li>15% improvement in waste management</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800">
                Areas for Focus
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-yellow-700">
                <li>Supply chain emissions still above target</li>
                <li>Water usage efficiency needs improvement</li>
                <li>Renewable energy adoption rate below goal</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">
                Recommendations
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-blue-700">
                <li>Implement energy management system</li>
                <li>Upgrade to efficient equipment</li>
                <li>Enhance supplier engagement program</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">
            Compliance & Risk Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Risk Distribution
              </h3>
              <div className="space-y-4">
                {supplierData.risks.map((risk, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">
                      {risk.category}
                    </span>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          risk.level === 'High'
                            ? 'bg-red-100 text-red-800'
                            : risk.level === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {risk.level}
                      </span>
                      <span className="ml-2 text-sm text-gray-900">
                        {risk.count} issues
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Compliance Progress
              </h3>
              <div className="space-y-4">
                {supplierData.compliance.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;

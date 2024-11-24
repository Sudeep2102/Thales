import React from 'react';
import GaugeChart from 'react-gauge-chart';

function SustainabilityGauge({ score }) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const recommendations = [
    {
      score: score >= 80 ? 'Maintain current practices' : 'Implement renewable energy solutions',
      impact: 'High',
      timeframe: '6-12 months'
    },
    {
      score: score >= 60 ? 'Optimize resource usage' : 'Reduce waste generation',
      impact: 'Medium',
      timeframe: '3-6 months'
    },
    {
      score: 'Enhance supplier collaboration',
      impact: 'Medium',
      timeframe: '6-9 months'
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sustainability Score</h3>
      <div className="flex flex-col items-center">
        <div style={{ width: '200px' }}>
          <GaugeChart
            id="sustainability-gauge"
            nrOfLevels={3}
            colors={['#EF4444', '#F59E0B', '#10B981']}
            percent={score / 100}
            textColor="#374151"
          />
        </div>
        <p className="text-3xl font-bold" style={{ color: getScoreColor(score) }}>
          {score}/100
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recommendations</h4>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-900">{rec.score}</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  rec.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Timeframe: {rec.timeframe}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SustainabilityGauge;
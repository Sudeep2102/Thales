import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function CarbonCredits() {
  const creditData = {
    total: 1000,
    used: 650,
    reserved: 200,
    available: 150,
    transactions: [
      {
        date: '2024-03-10',
        type: 'Purchase',
        amount: 100,
        price: 2500,
        status: 'completed'
      },
      {
        date: '2024-03-08',
        type: 'Offset',
        amount: 50,
        project: 'Reforestation',
        status: 'completed'
      },
      {
        date: '2024-03-05',
        type: 'Transfer',
        amount: 25,
        recipient: 'Partner A',
        status: 'pending'
      }
    ]
  };

  const pieData = [
    { name: 'Used Credits', value: creditData.used },
    { name: 'Reserved Credits', value: creditData.reserved },
    { name: 'Available Credits', value: creditData.available }
  ];

  const COLORS = ['#3B82F6', '#F59E0B', '#10B981'];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Carbon Credits Management</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Credits Distribution</h4>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {pieData.map((item, index) => (
              <div key={item.name} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <p className="mt-1 text-lg font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Recent Transactions</h4>
          <div className="space-y-4">
            {creditData.transactions.map((transaction, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Amount: <span className="font-medium">{transaction.amount} credits</span>
                  </p>
                  {transaction.price && (
                    <p className="text-sm text-gray-600">
                      Price: <span className="font-medium">${transaction.price}</span>
                    </p>
                  )}
                  {transaction.project && (
                    <p className="text-sm text-gray-600">
                      Project: <span className="font-medium">{transaction.project}</span>
                    </p>
                  )}
                  {transaction.recipient && (
                    <p className="text-sm text-gray-600">
                      Recipient: <span className="font-medium">{transaction.recipient}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonCredits;
import React from 'react';

function SupplierCompliance() {
  const suppliers = [
    {
      name: 'Supplier A',
      certifications: ['ISO 14001', 'Green Business Certified'],
      complianceScore: 92,
      lastAudit: '2024-02-15',
      status: 'compliant',
      risks: ['Documentation pending for Q1 2024']
    },
    {
      name: 'Supplier B',
      certifications: ['ISO 14001'],
      complianceScore: 78,
      lastAudit: '2024-01-20',
      status: 'warning',
      risks: ['Emissions above threshold', 'Delayed reporting']
    },
    {
      name: 'Supplier C',
      certifications: ['Green Business Certified', 'Carbon Neutral'],
      complianceScore: 95,
      lastAudit: '2024-03-01',
      status: 'compliant',
      risks: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Supplier Compliance Dashboard</h3>
      
      <div className="space-y-6">
        {suppliers.map((supplier) => (
          <div key={supplier.name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-medium text-gray-900">{supplier.name}</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {supplier.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  supplier.status
                )}`}
              >
                {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Compliance Score</span>
                <span className="text-sm font-medium text-gray-900">
                  {supplier.complianceScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    supplier.complianceScore >= 90
                      ? 'bg-green-600'
                      : supplier.complianceScore >= 70
                      ? 'bg-yellow-600'
                      : 'bg-red-600'
                  }`}
                  style={{ width: `${supplier.complianceScore}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-gray-600">Last Audit: {supplier.lastAudit}</span>
            </div>

            {supplier.risks.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Risk Factors:</h5>
                <ul className="list-disc list-inside space-y-1">
                  {supplier.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-red-600">
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupplierCompliance;
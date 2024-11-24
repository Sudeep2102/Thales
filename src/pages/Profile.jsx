import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const [activeTab, setActiveTab] = useState('company');
  const { user } = useAuth();

  const companyInfo = {
    basic: {
      name: 'EcoTech Solutions',
      industry: 'Manufacturing',
      size: '1000-5000 employees',
      founded: '1995',
      headquarters: 'New York, USA',
      website: 'www.ecotechsolutions.com',
    },
    sustainability: {
      certifications: ['ISO 14001', 'Green Business Certified', 'Carbon Neutral'],
      initiatives: [
        'Zero Waste Program',
        'Renewable Energy Transition',
        'Sustainable Packaging',
      ],
      goals: [
        'Carbon Neutral by 2025',
        '100% Renewable Energy by 2024',
        'Zero Waste to Landfill by 2023',
      ],
    },
    contacts: {
      primary: {
        name: 'John Smith',
        role: 'Sustainability Director',
        email: 'john.smith@ecotechsolutions.com',
        phone: '+1 (555) 123-4567',
      },
      emergency: {
        name: 'Sarah Johnson',
        role: 'Environmental Compliance Manager',
        email: 'sarah.johnson@ecotechsolutions.com',
        phone: '+1 (555) 987-6543',
      },
    },
  };

  const securitySettings = {
    twoFactorEnabled: true,
    lastPasswordChange: '2024-02-15',
    loginHistory: [
      {
        date: '2024-03-10',
        time: '09:30 AM',
        location: 'New York, USA',
        device: 'Chrome / Windows',
      },
      {
        date: '2024-03-09',
        time: '02:15 PM',
        location: 'New York, USA',
        device: 'Safari / MacOS',
      },
    ],
  };

  const complianceInfo = {
    certifications: [
      {
        name: 'ISO 14001:2015',
        status: 'Active',
        expiryDate: '2025-12-31',
        lastAudit: '2023-06-15',
      },
      {
        name: 'Carbon Trust Standard',
        status: 'Active',
        expiryDate: '2024-09-30',
        lastAudit: '2023-09-15',
      },
    ],
    reports: [
      {
        name: 'Annual Sustainability Report',
        submissionDate: '2024-01-15',
        status: 'Submitted',
        nextDue: '2025-01-15',
      },
      {
        name: 'Carbon Emissions Report',
        submissionDate: '2023-12-01',
        status: 'Submitted',
        nextDue: '2024-12-01',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('company')}
              className={`${
                activeTab === 'company'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Company Profile
            </button>
            <button
              onClick={() => setActiveTab('sustainability')}
              className={`${
                activeTab === 'sustainability'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Sustainability
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`${
                activeTab === 'compliance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Compliance
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Company Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    {Object.entries(companyInfo.basic).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Primary Contact
                    </h4>
                    <dl className="space-y-2">
                      {Object.entries(companyInfo.contacts.primary).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-sm font-medium text-gray-500">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </dt>
                          <dd className="text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Emergency Contact
                    </h4>
                    <dl className="space-y-2">
                      {Object.entries(companyInfo.contacts.emergency).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-sm font-medium text-gray-500">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </dt>
                          <dd className="text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sustainability' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Sustainability Profile
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Certifications
                    </h4>
                    <ul className="space-y-2">
                      {companyInfo.sustainability.certifications.map((cert, index) => (
                        <li key={index} className="text-sm text-gray-900">
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Current Initiatives
                    </h4>
                    <ul className="space-y-2">
                      {companyInfo.sustainability.initiatives.map((initiative, index) => (
                        <li key={index} className="text-sm text-gray-900">
                          {initiative}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Sustainability Goals
                    </h4>
                    <ul className="space-y-2">
                      {companyInfo.sustainability.goals.map((goal, index) => (
                        <li key={index} className="text-sm text-gray-900">
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Security Settings
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`${
                        securitySettings.twoFactorEnabled
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      <span
                        className={`${
                          securitySettings.twoFactorEnabled
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Recent Login Activity
                    </h4>
                    <div className="space-y-3">
                      {securitySettings.loginHistory.map((login, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded border border-gray-200"
                        >
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {login.date} at {login.time}
                            </span>
                            <span className="text-sm text-gray-500">
                              {login.device}
                            </span>
                          </div> 
                          <boltAction type="file" filePath="src/pages/Profile.jsx"></boltAction>                          
                            <p className="text-sm text-gray-500 mt-1">
                              Location: {login.location}
                            </p>
                          </div>
                        ))}     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Compliance & Certifications
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Active Certifications
                    </h4>
                    <div className="space-y-4">
                      {complianceInfo.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">
                                {cert.name}
                              </h5>
                              <p className="text-sm text-gray-500 mt-1">
                                Last Audit: {cert.lastAudit}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                cert.status === 'Active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {cert.status}
                            </span>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Expires: {cert.expiryDate}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Compliance Reports
                    </h4>
                    <div className="space-y-4">
                      {complianceInfo.reports.map((report, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">
                                {report.name}
                              </h5>
                              <p className="text-sm text-gray-500 mt-1">
                                Submitted: {report.submissionDate}
                              </p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {report.status}
                            </span>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Next Due: {report.nextDue}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
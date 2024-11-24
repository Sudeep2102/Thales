import { useState } from 'react';

function RiskAlert({ risk }) {
  const [isOpen, setIsOpen] = useState(true);

  const severityColors = {
    high: 'bg-red-50 text-red-800 border-red-200',
    medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    low: 'bg-green-50 text-green-800 border-green-200',
  };

  if (!isOpen) return null;

  return (
    <div className={`rounded-md p-4 border ${severityColors[risk.severity]}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {risk.severity === 'high' && (
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {risk.severity === 'medium' && (
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm">{risk.message}</p>
          <div className="mt-3 md:mt-0 md:ml-6">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskAlert;
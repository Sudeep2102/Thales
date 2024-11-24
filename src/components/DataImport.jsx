import { useState } from 'react';
import { setCurrentData } from '../data/environmentalData';

export default function DataImport() {
  const [error, setError] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      let data;

      if (file.name.endsWith('.csv')) {
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        data = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim();
            return obj;
          }, {});
        });
      } else if (file.name.endsWith('.json')) {
        data = JSON.parse(text);
      } else {
        throw new Error('Unsupported file format. Please upload CSV or JSON files.');
      }

      setCurrentData(data);
      setError('');
    } catch (err) {
      setError('Error processing file: ' + err.message);
    }
  };

  return (
    <div className="inline-block">
      <label className="inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
        Import Data
        <input
          type="file"
          accept=".csv,.json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
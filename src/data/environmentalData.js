// Default data
import defaultData from '../pages/data.json';

let currentData = [...defaultData];

export const getCurrentData = () => currentData;

export const setCurrentData = (newData) => {
  currentData = newData;
  // Trigger a custom event to notify components of data change
  window.dispatchEvent(new CustomEvent('environmentalDataUpdate'));
};

export const exportData = (format) => {
  const data = getCurrentData();
  
  switch (format) {
    case 'csv':
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => Object.values(row).join(','));
      const csv = [headers, ...rows].join('\n');
      return new Blob([csv], { type: 'text/csv' });
      
    case 'xlsx':
      // For demo, we'll return CSV for Excel too
      const excelCsv = exportData('csv');
      return new Blob([excelCsv], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
    case 'pdf':
      // For demo, returning a text version for PDF
      const text = JSON.stringify(data, null, 2);
      return new Blob([text], { type: 'application/pdf' });
      
    default:
      return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  }
};
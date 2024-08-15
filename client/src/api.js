// client/src/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/your-endpoint`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true // Include credentials with the request
});

export const fetchDueInvoices = () => api.get('/invoices/due');
export const triggerAutomation = () => api.post('/zapier/send-reminder');

export default api;

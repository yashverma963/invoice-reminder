import React, { useEffect, useState } from 'react';
import { fetchDueInvoices, triggerAutomation } from '../services/api';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const { data } = await fetchDueInvoices();
        setInvoices(data);
      } catch (error) {
        setError('Failed to fetch due invoices2');
        console.error(error);
      }
    };

    getInvoices();
  }, []);

  const handleTriggerAutomation = async () => {
    try {
      await triggerAutomation();
      alert('Automation triggered successfully!');
    } catch (error) {
      setError('Failed to trigger automation');
      console.error('Failed to trigger automation', error);
    }
  };

  return (
    <div>
      <h2>Due Invoices</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {invoices.map(invoice => (
          <li key={invoice._id}>
            Amount: {invoice.amount} | Due Date: {new Date(invoice.dueDate).toLocaleDateString()} | Recipient: {invoice.recipient}
          </li>
        ))}
      </ul>
      <button onClick={handleTriggerAutomation}>Trigger Automation</button>
    </div>
  );
};

export default InvoiceList;

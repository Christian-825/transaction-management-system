import axios from "axios";

const API_URL = "http://localhost:4000/transactions";

// Fetch all transactions from backend API
export const fetchTransactions = async () => {
  // GET request with no-cache header to avoid cached responses
  const res = await axios.get(API_URL, { headers: { "Cache-Control": "no-cache" } });
  
  // Transform the received data keys to frontend-friendly format
  return res.data.map(tx => ({
    transactionDate: tx["Transaction Date"],
    accountNumber: tx["Account Number"],
    accountHolder: tx["Account Holder Name"],
    amount: tx["Amount"],
    status: tx["Status"]
  }));
};

// Send a new transaction to backend API to create it
export const createTransaction = async (transaction) => {
  const res = await axios.post(API_URL, transaction);
  return res.data;
};

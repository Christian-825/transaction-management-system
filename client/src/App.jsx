import React, { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import AddTransactionList from "./components/TransactionList";
import { fetchTransactions, createTransaction } from "./api/transactionApi";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import './App.css';

function App() {
  // State to hold the list of transactions
  const [transactions, setTransactions] = useState([]);
  // State to control the visibility of the add transaction modal form
  const [showForm, setShowForm] = useState(false);

  // Function to fetch transactions from API and format for the table
  const loadTransactions = async () => {
    const data = await fetchTransactions(); // Fetch raw data from API

    // Transform API data keys to match table headers expected by AddTransactionList
    const formatted = data.map(tx => ({
      "Transaction Date": tx.transactionDate,
      "Account Number": tx.accountNumber,
      "Account Holder Name": tx.accountHolder,
      "Amount": tx.amount,
      "Status": tx.status
    }));

    setTransactions(formatted); // Update state with formatted transactions
  };

  // Load transactions once when component mounts
  useEffect(() => {
    loadTransactions();
  }, []);

  // Handler for adding a new transaction
  const handleAddTransaction = async (tx) => {
    await createTransaction(tx); // Send new transaction to API
    loadTransactions();          // Refresh the transaction list after adding
  };

  return (
    <div className="app-container">
      <div className="app-header mb-4 d-flex flex-column flex-md-row justify-content-center align-items-center">
        <h1 className="text-center text-lg-start mb-3 mb-md-0">TRANSACTION MANAGEMENT SYSTEM</h1>
        <button 
          className="add-transaction-btn ms-md-3"
          onClick={() => setShowForm(true)}
        >
          Add Transaction
        </button>
      </div>

      {/* Modal form component to add new transactions */}
      <TransactionForm
        show={showForm}            
        onAdd={handleAddTransaction} 
        onClose={() => setShowForm(false)} 
      />

      {/* Table component to display list of transactions */}
      <AddTransactionList transactions={transactions} />
    </div>
  );
}

export default App;

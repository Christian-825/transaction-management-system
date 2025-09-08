import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TransactionForm = ({ onAdd, onClose, show }) => {
  // State to hold form input values
  const [transaction, setTransaction] = useState({
    transactionDate: "",
    accountNumber: "",
    accountHolder: "",
    amount: ""
  });

  // State to hold validation error messages
  const [error, setError] = useState("");

  // Reset form fields and errors when modal is shown
  useEffect(() => {
    if (show) {
      setTransaction({
        transactionDate: "",
        accountNumber: "",
        accountHolder: "",
        amount: ""
      });
      setError("");
    }
  }, [show]);

  // Handle modal close and reset form
  const handleClose = () => {
    setTransaction({
      transactionDate: "",
      accountNumber: "",
      accountHolder: "",
      amount: ""
    });
    setError("");
    onClose();
  };

  // Update form state on input change and clear error
  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
    setError("");
  };

  // Validate inputs and submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Account number must be numeric only and exactly 12 digits
    if (/\D/.test(transaction.accountNumber)) {
      setError("Account Number cannot contain letters or special characters.");
      return;
    }
    if (transaction.accountNumber.length !== 12) {
      setError("Account Number must be exactly 12 digits.");
      return;
    }

    onAdd(transaction);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <Modal.Title>Add Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="date"
              name="transactionDate"
              className="form-control"
              value={transaction.transactionDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="accountNumber"
              className="form-control"
              placeholder="Account Number"
              value={transaction.accountNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="accountHolder"
              className="form-control"
              placeholder="Account Holder"
              value={transaction.accountHolder}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="amount"
              className="form-control"
              placeholder="Amount"
              value={transaction.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionForm;

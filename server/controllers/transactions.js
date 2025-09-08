const { getTransactions, addTransaction } = require("../models/transactions");

// Allowed status values
const VALID_STATUSES = ["Pending", "Settled", "Failed"];

// GET /transactions
const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await getTransactions();
    res.json(transactions);
  } catch (err) {
    next(err); // forward unexpected errors to middleware
  }
};

// POST /transactions
const createTransaction = async (req, res, next) => {
  try {
    const { transactionDate, accountNumber, accountHolder, amount } = req.body;

    // Basic validation
    if (!transactionDate || !accountNumber || !accountHolder || !amount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(transactionDate)) {
      return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    // Validate amount is a number
    if (isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a valid number." });
    }
   
    // Validate accountNumber contains only digits
    if (!/^\d+$/.test(accountNumber)) {
      return res.status(400).json({ message: "Account Number must contain only digits." });
    }

    // Assign random status
    const status = VALID_STATUSES[Math.floor(Math.random() * VALID_STATUSES.length)];

    const newTransaction = {
      transactionDate,
      accountNumber,
      accountHolder,
      amount: parseFloat(amount).toFixed(2), // ensure decimal
      status
    };

    await addTransaction(newTransaction);
    res.status(201).json(newTransaction);

  } catch (err) {
    next(err); // forward unexpected errors to middleware
  }
};

module.exports = {
  getAllTransactions,
  createTransaction
};

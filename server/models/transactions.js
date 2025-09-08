const { readCSV, writeCSV } = require("../utils/csvHelper");

// Get all transactions
const getTransactions = async () => {
  return await readCSV();
};

// Add a new transaction
const addTransaction = async (transaction) => {
  const transactions = await getTransactions();
  transactions.push(transaction);
  await writeCSV(transactions);
  return transaction;
};

module.exports = {
  getTransactions,
  addTransaction
};

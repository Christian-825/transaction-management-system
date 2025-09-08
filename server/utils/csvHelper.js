const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");

// Path to CSV
const filePath = path.join(__dirname, "../data/transactions.csv");

// CSV headers
const headers = ["Transaction Date", "Account Number", "Account Holder Name", "Amount", "Status"];

// Read CSV into JSON
const readCSV = async () => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (!fileContent.trim()) return [];
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
  } catch (err) {
    console.error("Error reading CSV:", err);
    return [];
  }
};

// Write JSON into CSV (append new rows to existing)
// Helper to format account number with dash every 4 digits
const formatAccountNumber = (acc) => {
  return acc.replace(/\D/g, "") // remove non-digits
            .match(/.{1,4}/g)  // split every 4 chars
            ?.join("-") || acc; // join with dash
};

// Write JSON into CSV (append new rows to existing)
const writeCSV = async (newRows) => {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Read existing CSV
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      if (fileContent.trim()) {
        existingData = parse(fileContent, { columns: true, skip_empty_lines: true, trim: true });
      }
    }

    // Format new rows
    const formattedNewRows = newRows
      .filter(row => row && row.transactionDate && row.accountNumber && row.accountHolder)
      .map(row => ({
        "Transaction Date": row.transactionDate,
        "Account Number": formatAccountNumber(row.accountNumber), // format here
        "Account Holder Name": row.accountHolder,
        "Amount": row.amount ? parseFloat(row.amount).toFixed(2) : "0.00",
        "Status": row.status || ""
      }));

    // Combine existing + new
    const allData = [...existingData, ...formattedNewRows];

    // Write CSV
    const csv = stringify(allData, { header: true, columns: headers });
    fs.writeFileSync(filePath, csv, "utf-8");
    console.log("Transactions updated, new rows appended.");
  } catch (err) {
    console.error("Error writing CSV:", err);
  }
};


module.exports = {
  readCSV,
  writeCSV
};

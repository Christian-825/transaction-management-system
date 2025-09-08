const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");

// File path and CSV headers
const filePath = path.join(__dirname, "../data/transactions.csv");
const headers = ["Transaction Date", "Account Number", "Account Holder Name", "Amount", "Status"];

// Read transactions from CSV
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

// Format account number with dashes
const formatAccountNumber = (acc) => {
  return acc.replace(/\D/g, "")
            .match(/.{1,4}/g)
            ?.join("-") || acc;
};

// Write transactions into CSV
const writeCSV = async (newRows) => {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      if (fileContent.trim()) {
        existingData = parse(fileContent, { columns: true, skip_empty_lines: true, trim: true });
      }
    }

    const formattedNewRows = newRows
      .filter(row => row && row.transactionDate && row.accountNumber && row.accountHolder)
      .map(row => ({
        "Transaction Date": row.transactionDate,
        "Account Number": formatAccountNumber(row.accountNumber),
        "Account Holder Name": row.accountHolder,
        "Amount": row.amount ? parseFloat(row.amount).toFixed(2) : "0.00",
        "Status": row.status || ""
      }));

    const allData = [...existingData, ...formattedNewRows];
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

import React from "react";
import Table from "react-bootstrap/Table";

const AddTransactionList = ({ transactions }) => {
  return (
    <div className="table-responsive"> 
      <Table hover className="transaction-table">
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>Account Number</th>
            <th>Account Holder Name</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each transaction as a table row */}
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx["Transaction Date"]}</td>
              <td>{tx["Account Number"]}</td>
              <td>{tx["Account Holder Name"]}</td>
              <td>{tx["Amount"]}</td>
              <td>
                {/* Status badge with dynamic styling based on status */}
                <span
                  className={`status-badge status-${tx["Status"].trim().toLowerCase()}`}
                >
                  {tx["Status"]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AddTransactionList;

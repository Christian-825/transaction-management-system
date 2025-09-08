const express = require("express");
const { getAllTransactions, createTransaction } = require("../controllers/transactions");

const router = express.Router();

// GET /transactions
router.get("/", getAllTransactions);

// POST /transactions
router.post("/", createTransaction);

module.exports = router;

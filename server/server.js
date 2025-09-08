// [SECTION] Dependencies and Modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const transactionRoutes = require("./routes/transactions");
const noCache = require("./middlewares/noCache");
const errorHandler = require("./middlewares/errorHandler");

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));

// Use the no-cache middleware
app.use(noCache);
app.use(errorHandler);

// Routes
app.use("/transactions", transactionRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Transaction Management API (CSV Storage) is running...");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

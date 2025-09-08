# Transaction Management System   

## **Prerequisites**  

Before you begin, make sure the following software is installed on your computer:  

- [**Node.js**](https://nodejs.org/) **v18.x** or later  
  - Node.js includes **npm** (Node Package Manager).  
  - You will use `npm` to download and install dependencies.  
- [**npm**](https://www.npmjs.com/) **v9.x** or later (automatically installed with Node.js).  
- A code editor such as [**Visual Studio Code**](https://code.visualstudio.com/).  
- **Git** (optional).  
  - You only need Git if you want to *clone* a project from GitHub.  
  - It is **not required** if you already have the project as a ZIP file.  

### Checking your installation  
Open your operating system’s terminal:  
- **Windows:** Command Prompt (`cmd`) or PowerShell  
- **macOS:** Terminal (found in Applications → Utilities)  
- **Linux:** Terminal (varies by distribution)  

Run the following commands to verify installation:  

```bash
node -v   # should print a version number like v18.x.x or v20.x.x
npm -v    # should print a version number like 9.x.x
```  

---

## **Installation**  

### 1. Project Structure  
After extracting the ZIP files, ensure your project looks like this:  

```
project/
  ├── client/   # Frontend (React + Vite)
  └── server/   # Backend (Node.js + Express)
```  

### 2. Install Dependencies  

Since the `node_modules` folder is not included, you must install them manually:  

#### Backend (server)  
```bash
cd server
npm install
```  

#### Frontend (client)  
```bash
cd ../client
npm install
```  

This installs all required packages listed in each `package.json`.  

---

## **Configuration**  

The backend uses environment variables defined in a `.env` file.  

- A `.env` file is **included** in the `server/` folder for convenience.  
- It contains the following content by default:  

```
PORT=4000
```

- `PORT` → sets the backend server port.  

> ⚠️ Note: In most projects, `.env` files are **not included** in the repository for security reasons. Normally, you would create it manually.  

No additional configuration is required for the frontend.  

> ⚠️ You can edit the `PORT` value in the `.env` file if you want the backend to run on a different port.
 
---

## **Running the Application**  

### Start the Backend (Server)  

```bash
cd server
npm start
```

The backend will run at:  
```
http://localhost:4000
```  

### Start the Frontend (Client)  

Open another terminal:  

```bash
cd client
npm run dev
```

The frontend will run at:  
```
http://localhost:5173
```  

---

## **API Documentation**  

The backend provides REST API endpoints for managing transactions.  

### Base URL  
```
http://localhost:4000/api/transactions
```  

### Endpoints  

#### 1. Get all transactions  
**GET** `/api/transactions`  

Example response:  
```json
[
  {
    "transactionDate": "2023-09-08",
    "accountNumber": "123456789",
    "accountHolder": "John Doe",
    "amount": "100.00",
    "status": "Pending"
  }
]
```  

#### 2. Add a new transaction  
**POST** `/api/transactions`  

Request body:  
```json
{
  "transactionDate": "2023-09-08",
  "accountNumber": "123456789",
  "accountHolder": "John Doe",
  "amount": 100
}
```  

Response:  
```json
{
  "transactionDate": "2023-09-08",
  "accountNumber": "123456789",
  "accountHolder": "John Doe",
  "amount": "100.00",
  "status": "Settled"
}
```  
- `transactionDate` must follow the format **YYYY-MM-DD**  
- `accountNumber` must contain only digits  
- `amount` must be a valid number  
- `status` is randomly assigned (`Pending`, `Settled`, or `Failed`)  
---

## **Testing**  

### 1. Manual Testing  
- Start both backend and frontend.
   - Backend: open a terminal, go to the `server` folder, run `npm start`.  
   - Frontend: open another terminal, go to the `client` folder, run `npm run dev`.
- Open `http://localhost:5173` in a browser.  
- Use the form to add a transaction → confirm it appears in the list.  
- Refresh the page → confirm transactions are still loaded from the backend.  

### 2. Transactions API – Postman Testing Guide

#### 1. Start the Backend
```bash
npm start
```
```bash
node server.js
```

## Base URL
```
http://localhost:4000
```

---

#### 2. GET /transactions
**Request**
```
Method: GET
URL: http://localhost:4000/transactions
```

**Postman Steps**
```
1. Open Postman and create a new request.
2. Set method to GET.
3. Enter http://localhost:4000/transactions as the URL.
4. Click Send.
```

**Example Response**
```json
[
  {
    "transactionDate": "2023-09-08",
    "accountNumber": "123456789",
    "accountHolder": "Alice",
    "amount": "250.00",
    "status": "Settled"
  }
]
```

---

#### 3. POST /transactions
**Request**
```
Method: POST
URL: http://localhost:4000/transactions
Headers:
  Content-Type: application/json
```

**Body (raw → JSON)**
```json
{
  "transactionDate": "2023-09-08",
  "accountNumber": "123456789",
  "accountHolder": "Alice",
  "amount": 250
}
```

**Postman Steps**
```
1. Create a new request in Postman.
2. Set method to POST.
3. Enter http://localhost:4000/transactions as the URL.
4. Go to Body → select raw → choose JSON.
5. Paste the JSON payload above.
6. Click Send.
```

**Example Response**
```json
{
  "transactionDate": "2023-09-08",
  "accountNumber": "123456789",
  "accountHolder": "Alice",
  "amount": "250.00",
  "status": "Pending"
}
```
**Notes**
- `transactionDate` → format **YYYY-MM-DD**  
- `accountNumber` → digits only  
- `amount` → numeric value  
- `status` → randomly assigned (`Pending`, `Settled`, or `Failed`)  







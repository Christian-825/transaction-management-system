# Transaction Management System   

## **Prerequisites**  

Before you begin, install the following software:  

- [Node.js](https://nodejs.org/) **v18.x** or later  
- [npm](https://www.npmjs.com/) **v9.x** or later (comes with Node.js)  
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)  
- Git (optional, if you want to clone a repository instead of downloading ZIPs)  

Check versions:  
```bash
node -v
npm -v
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

The backend requires environment variables defined in a `.env` file.  
Since `.env` is not included, you need to create it manually.  

1. Navigate to the `server/` folder.  
2. Create a file named `.env`.  
3. Add the following content:  

```
PORT=5000
```

- `PORT` → sets the backend server port.  

No additional configuration is required for the frontend.  

---

## **Running the Application**  

### Start the Backend (Server)  

```bash
cd server
npm start
```

The backend will run at:  
```
http://localhost:5000
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
http://localhost:5000/api/transactions
```  

### Endpoints  

#### 1. Get all transactions  
**GET** `/api/transactions`  

Example response:  
```json
[
  {
    "id": 1,
    "description": "Coffee",
    "amount": -3.5,
    "date": "2023-09-08"
  }
]
```  

#### 2. Add a new transaction  
**POST** `/api/transactions`  

Request body:  
```json
{
  "description": "Groceries",
  "amount": -50,
  "date": "2023-09-08"
}
```  

Response:  
```json
{
  "id": 2,
  "description": "Groceries",
  "amount": -50,
  "date": "2023-09-08"
}
```  

#### 3. Delete a transaction  
**DELETE** `/api/transactions/:id`  

Example:  
```
DELETE /api/transactions/2
```  

Response:  
```json
{ "message": "Transaction deleted successfully" }
```  

---

## **Testing**  

### 1. Manual Testing  
- Start both backend and frontend.  
- Open `http://localhost:5173` in a browser.  
- Add a transaction → confirm it shows in the list.  
- Delete a transaction → confirm it disappears.  

### 2. API Testing with Postman or curl  
Run backend only and test endpoints:  

```bash
# Get all transactions
curl http://localhost:5000/api/transactions

# Add a new transaction
curl -X POST http://localhost:5000/api/transactions   -H "Content-Type: application/json"   -d '{"description":"Books","amount":-20,"date":"2023-09-08"}'
```  

---

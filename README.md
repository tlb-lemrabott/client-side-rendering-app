# Mini Client-Side Rendering (CSR) Application

A mini client-side rendering (CSR) application built with vanilla JavaScript.  
It demonstrates how a client-side rendering framework works under the hood — loading a static HTML shell, fetching data asynchronously, and updating the DOM dynamically without reloading the page.

---

## Overview
- Renders the UI dynamically using vanilla JavaScript  
- Fetches data from a mock API  
- Updates the DOM when data arrives  
- Mimics the basic behavior of frameworks like React or Vue

---

## Project Structure
- Two parts:
  - **Backend API (`backend-api`)** → Express server at `http://localhost:3000`
    - Endpoint: `GET /:name` → `{ "message": "Hey {name}, great to see you!" }`
    - Root: `GET /` → 400 with hint when name is missing
    - Logs: console and backup file at `backend-api/logs/app.log`
  - **Frontend (`ui-code`)** → optional placeholder for a static UI (not required to use the API)

```bash
client-side-rendering-app/
│
├── backend-api/                    # Express API server (port 3000)
│   ├── server.js                   # Entry
│   └── src/
│       ├── app.js                  # Express app setup
│       ├── routes/users.js         # Routes (/:name and /)
│       ├── services/users.js       # Greeting business logic
│       ├── middleware/requestLogger.js
│       └── logger/                 # Console + file logging
│
└── ui-code/                        # (optional) static frontend placeholder
```

---
## Run Locally

1. Clone the repository:
   ```bash
   git clone git@github.com:tlb-lemrabott/client-side-rendering-app.git
   cd mini-client-side-rendering
2. Install dependencies for the backend API:
```bash
cd backend-api && npm install
```
3. Start the backend API:
```bash
npm start        # http://localhost:3000
```

Try it in the browser or with curl:
```bash
http://localhost:3000/alice
=> { "message": "Hey Alice, great to see you!" }

http://localhost:3000/
=> 400 { "error": "Missing name in path parameter", "hint": "Use /{your-name}, e.g., /alice" }
```

Logs are written to the console and to `backend-api/logs/app.log` (created automatically). The log lines include request ID, method, path, timestamps, status, duration, and browser info (User-Agent, referer, IP) when present.

---

# Key Concept
This project illustrates the internal behavior of Client-Side Rendering (CSR) — how frameworks fetch data, update the DOM, and render dynamic views — implemented manually with vanilla JavaScript and Express.js.

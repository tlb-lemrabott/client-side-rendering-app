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
  - **Frontend (`ui-code`)** → static UI demonstrating CSR on `http://localhost:4000`

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
└── ui-code/                        # Static frontend (port 4000)
    ├── web.js                      # Tiny static server + POST /__log
    ├── index.html                  # HTML shell
    ├── app.js                      # CSR logic (fetch + DOM updates)
    ├── styles.css                  # UI styles
    └── src/logger/                 # Console + file logging (ui-code/logs/app.log)
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

4. Run the UI (CSR demo):
```bash
cd ui-code
npm install   # installs logger (already committed, safe to re-run)
npm start     # http://localhost:4000
```

Open http://localhost:4000, type a name, and submit. The UI fetches the backend and updates the DOM without a page reload.

UI logs go to the console and to `ui-code/logs/app.log`. The UI server also exposes `POST /__log` so the browser can forward client-side CSR logs to disk.

What gets logged (UI side):
- Static requests: method, path, status, duration, IP, User-Agent
- CSR stages: boot, initial fetch, user interaction, request sent (timestamp), response received (timestamp + duration), DOM update or error display
- DOM update details: which node changed and how, e.g. selector, prop, value/valuePreview

---

# Key Concept
This project illustrates the internal behavior of Client-Side Rendering (CSR) — how frameworks fetch data, update the DOM, and render dynamic views — implemented manually with vanilla JavaScript and Express.js.

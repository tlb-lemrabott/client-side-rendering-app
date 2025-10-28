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
- Two separate Node.js + Express.js servers:
  - **Frontend (`ui-code`)** → serves HTML, CSS, and JavaScript at `http://localhost:3400`
  - **Backend API (`backend-api`)** → returns mock JSON data at `http://localhost:3000/:userId`
- Mimics how frameworks like React or Vue render UI dynamically on the client side.

```bash
mini-client-side-rendering/
│
├── backend-api/ # Express API server (port 3000)
│ └── api.js
│
├── ui-code/ # Frontend static app (port 3400)
│ ├── web.js
│ ├── index.html
│ ├── app.js
│ └── styles.css
│
└── README.md
```

---
## Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/mini-client-side-rendering.git
   cd mini-client-side-rendering
2. Install dependencies in both folders:
```bash
cd backend-api && npm install
cd ../ui-code && npm install
```
3. Start both servers:
```bash
# In backend-api folder
node api.js        # Runs at http://localhost:3000

# In ui-code folder
node web.js        # Runs at http://localhost:3400
```

Open in your browser:
http://localhost:3400/{your-name}

---

# Key Concept
This project illustrates the internal behavior of Client-Side Rendering (CSR) — how frameworks fetch data, update the DOM, and render dynamic views — implemented manually with vanilla JavaScript and Express.js.
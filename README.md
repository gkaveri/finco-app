# fin.flow — Personal Finance Dashboard

A clean, responsive Finance Dashboard built with React. Designed as a proof project to demonstrate real-world frontend skills.

---

## Live Demo

🔗 [Click here to view live](https://finflow-yourname.vercel.app)

---

## Screenshots

> Will be added after deployment

---

## Features

-> Dashboard with summary cards — balance, income, expenses
-> % change vs last month on each card
-> Line chart — income vs expenses trend over 6 months
-> Donut chart — spending by category with total in center
-> Transactions page — search, filter, sort
-> Add, edit, delete transactions (Admin only)
-> Role based UI — Admin vs Viewer
-> Insights page with AI style financial summary
-> filter + group by month, aterogy etc
-> Export transactions to CSV
-> Dark mode with smooth transition
-> Data persistence with localStorage
-> Fully responsive — mobile bottom nav + desktop sidebar

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI components and hooks |
| Vite | Build tool |
| Tailwind CSS | Styling and dark mode |
| Recharts | Data visualization |
| Context API | Global state management |

---

## Project Structure
```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── SummaryCards.jsx
│   ├── LineChart.jsx
│   ├── PieChart.jsx
│   ├── TransactionTable.jsx
│   └── Loader.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   ├── mockData.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
└── App.jsx
```
---

## Getting Started
```bash
# Clone the repo
git clone [https://github.com/gkaveri/finco-app.git]

# Navigate into the project
cd zorvyn-project

# Install dependencies
npm install

# Start development server
npm run dev


## What I Built

This project demonstrates:

-> Component based architecture with reusable UI
-> Global state management using Context API
-> Role based access control on the frontend
-> Data visualization with Recharts
-> Data persistence using localStorage
-> Mock API simulation with loading states
-> Responsive design for mobile and desktop
-> Dark mode with Tailwind class strategy

## Author

Built by Kaveri · [GitHub Profile](https://github.com/gkaveri)

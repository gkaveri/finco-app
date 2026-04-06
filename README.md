# fin.flow — Personal Finance Dashboard

A clean, responsive Finance Dashboard built with React. Designed as a proof project to demonstrate real-world frontend skills.

---

## Live Demo

🔗 [Click here to view live](https://finco-app-six.vercel.app)

---

## Screenshots
### Dashboard view(Desktop View)
![Dashboard Light](https://github.com/user-attachments/assets/a45283e4-bc86-4a13-830f-bb99291dbbc7)
![Dashboard](https://github.com/user-attachments/assets/160b650b-e031-40ed-91a6-9d4e8ea68d1f)

### Transactions Page
![Transactions](https://github.com/user-attachments/assets/ed6782cf-a735-4e55-99b3-e6ff85d0d09e)
![Transations with grouping](https://github.com/user-attachments/assets/158935c0-446b-41ee-ade0-8d26ffd57fd4)

### Insights Page
![Insights](https://github.com/user-attachments/assets/48dc043b-d021-4ec9-a8ba-0ad0a4b24dad)

### Dark Mode
![Dashboard dark](https://github.com/user-attachments/assets/ed3f20d8-7133-4120-b87c-fb7ef1b56d67)

### Mobile View
![Dashboard](https://github.com/user-attachments/assets/3124567c-4cef-4efc-9e0d-8064098c37dc)
![Insights page](https://github.com/user-attachments/assets/fb2dd0dd-857e-4a20-8d32-8c5bdfb2c346)






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

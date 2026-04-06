export const initialTransactions = [
  { id: 1, desc: "Monthly salary", amount: 85000, cat: "Salary", type: "income", date: "2025-04-01" },
  { id: 2, desc: "Freelance project", amount: 22000, cat: "Freelance", type: "income", date: "2025-04-05" },
  { id: 3, desc: "Swiggy order", amount: 840, cat: "Food & Dining", type: "expense", date: "2025-04-06" },
  { id: 4, desc: "Ola cab", amount: 420, cat: "Transport", type: "expense", date: "2025-04-07" },
  { id: 5, desc: "Amazon order", amount: 3200, cat: "Shopping", type: "expense", date: "2025-04-08" },
  { id: 6, desc: "Electricity bill", amount: 1800, cat: "Utilities", type: "expense", date: "2025-04-10" },
  { id: 7, desc: "Netflix subscription", amount: 649, cat: "Entertainment", type: "expense", date: "2025-04-10" },
  { id: 8, desc: "Apollo pharmacy", amount: 560, cat: "Health", type: "expense", date: "2025-04-11" },
  { id: 9, desc: "Udemy course", amount: 1299, cat: "Education", type: "expense", date: "2025-04-13" },
  { id: 10, desc: "Zomato dinner", amount: 1100, cat: "Food & Dining", type: "expense", date: "2025-04-14" },
  { id: 11, desc: "Bus pass", amount: 800, cat: "Transport", type: "expense", date: "2025-04-15" },
  { id: 12, desc: "H&M shopping", amount: 4200, cat: "Shopping", type: "expense", date: "2025-04-16" },
  { id: 13, desc: "Gym membership", amount: 1500, cat: "Health", type: "expense", date: "2025-04-18" },
  { id: 14, desc: "Freelance payment", amount: 15000, cat: "Freelance", type: "income", date: "2025-04-20" },
  { id: 15, desc: "Jio recharge", amount: 666, cat: "Utilities", type: "expense", date: "2025-04-21" },
]

export const categoryColors = {
  "Food & Dining": "#D85A30",
  "Transport": "#378ADD",
  "Shopping": "#BA7517",
  "Utilities": "#534AB7",
  "Entertainment": "#D4537E",
  "Health": "#1D9E75",
  "Education": "#185FA5",
  "Salary": "#1D9E75",
  "Freelance": "#0F6E56",
  "Other": "#888780",
}

export const categories = [
  "Food & Dining", "Transport", "Shopping", "Utilities",
  "Entertainment", "Health", "Education", "Salary", "Freelance", "Other"
]
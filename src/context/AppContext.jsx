import { createContext, useContext, useState, useEffect } from "react"
import { initialTransactions } from "../data/mockData"

const AppContext = createContext()

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("finflow-transactions")
      return saved ? JSON.parse(saved) : initialTransactions
    } catch {
      return initialTransactions
    }
  })

  const [role, setRole] = useState(() => {
    return localStorage.getItem("finflow-role") || "admin"
  })

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("finflow-darkmode") === "true"
  })

  const [activePage, setActivePage] = useState("dashboard")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem("finflow-transactions", JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("finflow-role", role)
  }, [role])

  useEffect(() => {
    localStorage.setItem("finflow-darkmode", darkMode)
  }, [darkMode])

  function addTransaction(tx) {
    setTransactions(prev => [...prev, { ...tx, id: Date.now() }])
  }

  function editTransaction(updated) {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t))
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  function resetData() {
    setTransactions(initialTransactions)
    localStorage.removeItem("finflow-transactions")
  }

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <AppContext.Provider value={{
      transactions, role, setRole,
      activePage, setActivePage,
      addTransaction, editTransaction, deleteTransaction,
      totalIncome, totalExpenses, balance,
      darkMode, setDarkMode,
      loading, setLoading,
      resetData,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
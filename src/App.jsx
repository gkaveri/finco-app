import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Insights from "./pages/Insights"
import { useApp } from "./context/AppContext"
import { MdDashboard, MdListAlt, MdInsights, MdLightMode, MdDarkMode } from "react-icons/md"

function App() {
  const { activePage, darkMode } = useApp()

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "transactions" && <Transactions />}
          {activePage === "insights" && <Insights />}
        </main>

        <BottomNav />

      </div>
    </div>
  )
}

function BottomNav() {
  const { activePage, setActivePage, darkMode, setDarkMode } = useApp()

  const items = [
    { id: "dashboard",    label: "Overview",      icon: <MdDashboard size={20} /> },
    { id: "transactions", label: "Transactions",  icon: <MdListAlt size={20} /> },
    { id: "insights",     label: "Insights",      icon: <MdInsights size={20} /> },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 
    border-t border-gray-100 dark:border-gray-700 flex items-center px-2 py-2 z-40">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-lg transition-all
            ${activePage === item.id
              ? "text-emerald-500"
              : "text-gray-400 dark:text-gray-500"
            }`}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </button>
      ))}

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex-1 flex flex-col items-center gap-1 py-1 rounded-lg 
        text-gray-400 dark:text-gray-500 transition-all"
      >
        {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        <span className="text-xs">{darkMode ? "Light" : "Dark"}</span>
      </button>
    </div>
  )
}

export default App
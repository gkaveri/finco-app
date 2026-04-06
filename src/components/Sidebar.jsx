import { useApp } from "../context/AppContext"
import { FiGrid, FiList, FiTrendingUp, FiMoon, FiSun } from "react-icons/fi"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: FiGrid },
  { id: "transactions", label: "Transactions", icon: FiList },
  { id: "insights", label: "Insights", icon: FiTrendingUp },
]

export default function Sidebar() {
  const { activePage, setActivePage, darkMode, setDarkMode } = useApp()

  return (
    <aside className="w-56 bg-gradient-to-b from-violet-500 via-fuchsia-200 to-blue-500 dark:from-indigo-950 dark:via-purple-900 dark:to-slate-800 border-r border-violet-300 dark:border-purple-600 min-h-screen flex flex-col transition-all duration-500 ease-out shadow-lg dark:shadow-none sticky top-0 h-screen overflow-y-auto">

      <div className="px-5 py-6 border-b border-violet-600 dark:border-purple-300/30 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-indigo-900 dark:text-indigo-100">
          FINCO<span className="text-indigo-400">.</span>APP
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-slate-400 hover:text-slate-200 transition-colors"
        >
          {darkMode ? <FiSun size={18} color='white' /> : <FiMoon size={18} color='white' />}
        </button>
      </div>
      
      <nav className="flex flex-col gap-3 pt-3 flex-1 px-3">
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 text-left w-full
                ${activePage === item.id
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-300/50 scale-105"
                  : "text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-700/60 hover:bg-indigo-200 dark:hover:bg-indigo-600 hover:text-indigo-900 dark:hover:text-white"
                }`}
            >
              <Icon size={15} />
              {item.label}
            </button>
          )
        })}
      </nav>

    </aside>
  )
}
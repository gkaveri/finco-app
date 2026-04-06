import SummaryCards from "../components/SummaryCards"
import BalanceLineChart from "../components/LineChart"
import SpendingPieChart from "../components/PieChart"
import { useApp } from "../context/AppContext"

export default function Dashboard() {
  const { role, setRole } = useApp()

  return (
    <div className="flex flex-col gap-6 bg-gradient-to-br from-cyan-500 via-sky-50 to-indigo-500 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 rounded-2xl p-5 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-0.5">

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight">
            Dashboard 
          </h2>
          <p className="text-sm text-white/80 font-bold mt-1">April 2025 · Personal Finance</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="roleSwitcher" className="text-xs text-gray-500 dark:text-gray-300">Role:</label>
          <select
            id="roleSwitcher"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="text-xs rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-2 py-1"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">        <BalanceLineChart />
        <SpendingPieChart />
      </div>

    </div>
  )
}
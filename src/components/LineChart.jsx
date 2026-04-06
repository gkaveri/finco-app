import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts"
import { useMemo } from "react"

const RAW_DATA = [
  { month: "Oct", income: 72000, expenses: 28000 },
  { month: "Nov", income: 85000, expenses: 31000 },
  { month: "Dec", income: 91000, expenses: 45000 },
  { month: "Jan", income: 78000, expenses: 33000 },
  { month: "Feb", income: 95000, expenses: 38000 },
  { month: "Mar", income: 88000, expenses: 41000 },
  { month: "Apr", income: 107000, expenses: 17034 },
]

const LINES = [
  { key: "income",   name: "Income",   color: "#10B981", dash: false },
  { key: "expenses", name: "Expenses", color: "#F97316", dash: false },
  { key: "savings",  name: "Savings",  color: "#3B82F6", dash: true  },
]

const fmt      = v => "₹" + (v / 1000).toFixed(0) + "k"
const fmtFull  = v => "₹" + v.toLocaleString("en-IN")

function calcData(raw) {
  return raw.map(d => ({
    ...d,
    savings:     d.income - d.expenses,
    savingsRate: Math.round(((d.income - d.expenses) / d.income) * 100),
  }))
}

function calcStats(data) {
  const totalIncome   = data.reduce((s, d) => s + d.income, 0)
  const totalExpenses = data.reduce((s, d) => s + d.expenses, 0)
  const totalSavings  = totalIncome - totalExpenses
  const last = data.at(-1)
  const prev = data.at(-2)

  return {
    avgSavingsRate: Math.round((totalSavings / totalIncome) * 100),
    currentSavings: last.savings,
    savingsTrend:   ((last.savings - prev.savings) / prev.savings) * 100,
    avgIncome:      totalIncome / data.length,
  }
}

function KpiCard({ label, value, color }) {
  const colors = {
    blue:   "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 text-blue-900 dark:text-blue-100",
    purple: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 text-purple-600 dark:text-purple-400 text-purple-900 dark:text-purple-100",
  }

  return (
    <div className={`bg-gradient-to-br ${color === "blue" ? "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20" : "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20"} rounded-lg p-3`}>
      <p className={`text-xs font-medium mb-1 ${color === "blue" ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"}`}>{label}</p>
      <p className={`text-lg font-bold ${color === "blue" ? "text-blue-900 dark:text-blue-100" : "text-purple-900 dark:text-purple-100"}`}>{value}</p>
    </div>
  )
}

function TrendCard({ trend }) {
  const up = trend >= 0
  return (
    <div className={`bg-gradient-to-br rounded-lg p-3 ${up ? "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20" : "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20"}`}>
      <p className={`text-xs font-medium mb-1 ${up ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>Savings Trend</p>
      <p className={`text-lg font-bold ${up ? "text-emerald-900 dark:text-emerald-100" : "text-red-900 dark:text-red-100"}`}>
        {up ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}%
      </p>
    </div>
  )
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload

  const rows = [
    { label: "Income",       value: fmtFull(d.income),   color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Expenses",     value: fmtFull(d.expenses),  color: "text-orange-600 dark:text-orange-400"   },
    { label: "Savings",      value: fmtFull(d.savings),   color: "text-blue-600 dark:text-blue-400"       },
    { label: "Savings Rate", value: `${d.savingsRate}%`,  color: "text-purple-600 dark:text-purple-400"   },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3 shadow-lg">
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{d.month}</p>
      <div className="space-y-1 text-xs">
        {rows.map(r => (
          <p key={r.label} className={r.color}>
            <span className="font-medium">{r.label}:</span> {r.value}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function BalanceLineChart() {
  const data  = useMemo(() => calcData(RAW_DATA), [])
  const stats = useMemo(() => calcStats(data), [data])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-200/30 dark:hover:shadow-emerald-900/20">

      <div className="mb-4">
        <p className="text-lg font-bold text-gray-900 dark:text-white">Income vs Expenses</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly analysis with savings insights</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <KpiCard label="Avg Savings Rate" value={`${stats.avgSavingsRate}%`}       color="blue"   />
        <KpiCard label="Current Savings"  value={fmt(stats.currentSavings)}        color="purple" />
        <TrendCard trend={stats.savingsTrend} />
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
          <YAxis tickFormatter={fmt}          tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
          <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "20px", fontWeight: 500 }} iconType="line" />
          <ReferenceLine y={stats.avgIncome} stroke="#10B981" strokeDasharray="5 5" opacity={0.3} />

          {LINES.map(({ key, name, color, dash }) => (
            <Line
              key={key}
              type="natural"
              dataKey={key}
              name={name}
              stroke={color}
              strokeWidth={dash ? 2.5 : 3}
              strokeDasharray={dash ? "5 5" : undefined}
              dot={{ r: dash ? 4 : 5, fill: color, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: dash ? 6 : 7, strokeWidth: 2 }}
              animationDuration={1000}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useApp } from "../context/AppContext"
import { categoryColors } from "../data/mockData"
import { useMemo} from "react"

const COLORS = ["#10B981", "#F97316", "#3B82F6", "#8B5CF6", "#EC4899", "#06B6D4", "#EAB308", "#6366F1"]

const fmt = n => "₹" + n.toLocaleString("en-IN")

function calcSpending(transactions) {
  const totals = {}
  const counts = {}

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totals[t.cat] = (totals[t.cat] || 0) + t.amount
      counts[t.cat] = (counts[t.cat] || 0) + 1
    })

  const total = Object.values(totals).reduce((s, v) => s + v, 0)

  const data = Object.entries(totals)
    .map(([name, value]) => ({
      name,
      value,
      count: counts[name] || 0,
      percentage: Math.round((value / total) * 100),
    }))
    .sort((a, b) => b.value - a.value)

  const top = data[0] || { name: "N/A", value: 0, percentage: 0 }

  return { data, total, top }
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 
    dark:border-gray-700 p-3 shadow-lg">
      <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">{d.name}</p>
      <div className="space-y-1 text-xs">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Amount:</span> {fmt(d.value)}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Percentage:</span> {d.percentage}%
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Transactions:</span> {d.count}
        </p>
      </div>
    </div>
  )
}

function LegendItem({ entry, index }) {
  const color = categoryColors[entry.name] || COLORS[index % COLORS.length]
  return (
    <div className="flex items-start justify-between gap-2 pb-2 border-b 
    border-gray-100 dark:border-gray-700/50 last:border-0">
      <div className="flex items-start gap-2 min-w-0">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
          style={{ background: color }}
        />
        <div className="min-w-0">
          <p className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate">
            {entry.name}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {entry.count} {entry.count === 1 ? "transaction" : "transactions"}
          </p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-bold text-gray-800 dark:text-gray-200 font-mono">
          {entry.percentage}%
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          {fmt(entry.value)}
        </p>
      </div>
    </div>
  )
}

function AISummary({ data, total, top }) {
  const insights = [
    `Your highest spending category is ${top.name}, accounting for ${top.percentage}% of total expenses (${fmt(top.value)}).`,
    `You spent across ${data.length} categories this month. ${
      data.length > 5
        ? "Diversified spending — but watch the smaller categories adding up."
        : "Focused spending across fewer categories."
    }`,
    `${
      top.percentage > 40
        ? `${top.name} is taking up a large chunk of your budget. Consider setting a limit for this category.`
        : top.percentage > 25
        ? `${top.name} is your dominant expense. Try to keep it under 25% of total spending.`
        : "Your spending is well distributed across categories. Keep it up!"
    }`,
    `Total expenses this month: ${fmt(total)}. ${
      data[1]
        ? `Your second largest category is ${data[1].name} at ${data[1].percentage}%.`
        : ""
    }`,
  ]

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">✨</span>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          AI Summary
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {insights.map((text, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/30
            text-emerald-500 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SpendingPieChart() {
  const { transactions } = useApp()
  const { data, total, top } = useMemo(() => calcSpending(transactions), [transactions])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 
    rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg 
    hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60">

      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Spending Breakdown
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
        Expenses by category
      </p>

      {/* Mini summary cards */}
      <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2.5">
          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
            Top Category
          </p>
          <p className="text-sm font-bold text-orange-900 dark:text-orange-100 truncate">
            {top.name}
          </p>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-0.5">
            {top.percentage}% of total
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2.5">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            Total Spent
          </p>
          <p className="text-sm font-bold text-blue-900 dark:text-blue-100">
            {fmt(total)}
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
            {data.length} categories
          </p>
        </div>
      </div>

      {/* Chart + Legend */}
      <div className="flex gap-6 items-start">
        <div className="relative w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={48} outerRadius={70}
                paddingAngle={1.5}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={categoryColors[entry.name] || COLORS[i % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-gray-400 dark:text-gray-500">Total</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white font-mono">
              {fmt(total)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1 max-h-56 overflow-y-auto">
          {data.map((entry, i) => (
            <LegendItem key={entry.name} entry={entry} index={i} />
          ))}
        </div>
      </div>

      <AISummary data={data} total={total} top={top} />

    </div>
  )
}
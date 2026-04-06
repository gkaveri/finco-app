import { useApp } from "../context/AppContext"
import { FiTrendingUp, FiTrendingDown, FiBriefcase } from "react-icons/fi"

function fmt(n) {
  return "₹" + Math.abs(n).toLocaleString("en-IN")
}

function WalletIcon() {
  return (
    <FiBriefcase size={20} />
  )
}

function IncomeIcon() {
  return (
    <FiTrendingUp size={20} />
  )
}

function ExpenseIcon() {
  return (
    <FiTrendingDown size={20} />
  )
}

export default function SummaryCards() {
  const { balance, totalIncome, totalExpenses } = useApp()

  const prevIncome = 160000
  const prevExpenses = 18000
  const prevBalance = prevIncome - prevExpenses

  function pctChange(current, previous) {
    if (previous === 0) return 0
    return (((current - previous) / previous) * 100).toFixed(1)
  }

  const cards = [
    {
      label: "Total Balance",
      value: fmt(balance),
      valueColor: "text-gray-900 dark:text-white",
      icon: <WalletIcon />,
      iconBg: "bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300",
      pct: pctChange(balance, prevBalance),
      pctPositiveIsGood: true,
    },
    {
      label: "Total Income",
      value: fmt(totalIncome),
      valueColor: "text-emerald-600 dark:text-emerald-400",
      icon: <IncomeIcon />,
      iconBg: "bg-emerald-50 text-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-300",
      pct: pctChange(totalIncome, prevIncome),
      pctPositiveIsGood: true,
    },
    {
      label: "Total Expenses",
      value: fmt(totalExpenses),
      valueColor: "text-red-500 dark:text-red-400",
      icon: <ExpenseIcon />,
      iconBg: "bg-red-50 text-red-400 dark:bg-red-900/30 dark:text-red-300",
      pct: pctChange(totalExpenses, prevExpenses),
      pctPositiveIsGood: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">      {cards.map((card) => {
        const pctNum = parseFloat(card.pct)
        const isGood = card.pctPositiveIsGood ? pctNum >= 0 : pctNum <= 0
        const pctColor = isGood
          ? "text-emerald-500 dark:text-emerald-400"
          : "text-red-500 dark:text-red-400"
        const arrow = pctNum >= 0 ? "↑" : "↓"

        return (
          <div
            key={card.label}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 
            transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60 
            dark:hover:shadow-gray-900/60 cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {card.label}
              </p>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                {card.icon}
              </div>
            </div>
            <p className={`text-2xl font-bold font-sans tracking-tight mb-3 ${card.valueColor}`}>
              {card.value}
            </p>
            <p className={`text-xs font-medium ${pctColor}`}>
              {arrow} {Math.abs(pctNum)}% vs last month
            </p>
          </div>
        )
      })}
    </div>
  )
}
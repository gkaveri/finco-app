import { useApp } from "../context/AppContext"
import { categoryColors } from "../data/mockData"

function fmt(n) {
  return "₹" + Math.abs(n).toLocaleString("en-IN")
}

export default function TransactionTable({ transactions, onEdit, onAdd }) {
  const { role, deleteTransaction } = useApp()

  function exportCSV() {
    const headers = ["Date", "Description", "Category", "Type", "Amount"]
    const rows = transactions.map((t) => [t.date, t.desc, t.cat, t.type, t.amount])
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const a = document.createElement("a")
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    a.download = "transactions.csv"
    a.click()
  }

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
          border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 
          transition-all hover:border-gray-300 active:scale-95"
        >
          ↓ Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
        {transactions.length === 0 ? (
          <div className="py-16 text-center text-gray-300 dark:text-gray-600 text-sm">
            No transactions found
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
               
                <th className="text-left text-xs text-gray-400 uppercase tracking-wider font-medium px-5 py-3.5">
                  Date
                </th>

                <th className="hidden sm:table-cell text-left text-xs text-gray-400 uppercase tracking-wider font-medium px-5 py-3.5">
                  Description
                </th>

                <th className="text-left text-xs text-gray-400 uppercase tracking-wider font-medium px-5 py-3.5">
                  Category
                </th>

                <th className="text-left text-xs text-gray-400 uppercase tracking-wider font-medium px-5 py-3.5">
                  Type
                </th>

                <th className="text-right text-xs text-gray-400 uppercase tracking-wider font-medium px-5 py-3.5">
                  Amount
                </th>

                {role === "admin" && (
                  <th className="hidden sm:table-cell text-right text-xs text-gray-400 uppercase tracking-wider font-medium px-5 py-3.5">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => {
                const dot = categoryColors[tx.cat] || "#888"
                const d = new Date(tx.date)
                const dateStr = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
                return (
                  <tr
                    key={tx.id}
                    className={`border-t border-gray-50 dark:border-gray-700/50 
                    hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150
                    `}
                  >
                    <td className="px-5 py-3.5 text-xs text-gray-400">
                      {dateStr}
                    </td>

                    <td className="px-5 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {tx.desc}
                    </td>

                    <td className="hidden sm:table-cell px-5 py-3.5">
                      <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                        {tx.cat}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                        ${tx.type === "income"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                        {tx.type}
                      </span>
                    </td>

                    <td className={`px-5 py-3.5 text-sm font-semibold font-mono text-right
                      ${tx.type === "income"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                      }`}>
                      {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                    </td>

                    {role === "admin" && (
                      <td className="hidden sm:table-cell px-5 py-3.5 text-right">
                        <button
                          onClick={() => onEdit(tx)}
                          className="text-xs text-gray-400 hover:text-blue-500 
                          transition-colors px-2 py-1 rounded hover:bg-blue-50 
                          dark:hover:bg-blue-900/20"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="text-xs text-gray-400 hover:text-red-500 
                          transition-colors px-2 py-1 rounded hover:bg-red-50 
                          dark:hover:bg-red-900/20 ml-1"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
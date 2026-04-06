import { useState } from "react"
import { createPortal } from "react-dom"
import { useApp } from "../context/AppContext"
import TransactionTable from "../components/TransactionTable"
import { categories } from "../data/mockData"

const emptyForm = {
  desc: "", amount: "", cat: "Food & Dining", type: "expense", date: ""
}

export default function Transactions() {
  const { role, transactions, addTransaction, editTransaction } = useApp()
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const [groupBy, setGroupBy] = useState("none")   
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)

  const filtered = transactions
    .filter((t) => {
      const q = search.toLowerCase()
      return (
        t.cat.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      )
    })
    .filter((t) => (filterType ? t.type === filterType : true))
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date)
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date)
      if (sortBy === "amount-desc") return b.amount - a.amount
      return a.amount - b.amount
    })

  function getGrouped(transactions) {
    if (groupBy === "none") return { "All": transactions }

    return transactions.reduce((acc, tx) => {
      let key = ""
      if (groupBy === "month") {
        key = new Date(tx.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
      } else if (groupBy === "category") {
        key = tx.cat
      } else if (groupBy === "type") {
        key = tx.type === "income" ? "Income" : "Expense"
      }
      if (!acc[key]) acc[key] = []
      acc[key].push(tx)
      return acc
    }, {})
  }

  const grouped = getGrouped(filtered)

  function openAdd() {
    setForm({ ...emptyForm, date: new Date().toISOString().split("T")[0] })
    setEditId(null)
    setShowModal(true)
  }

  function openEdit(tx) {
    setForm({ desc: tx.desc, amount: tx.amount, cat: tx.cat, type: tx.type, date: tx.date })
    setEditId(tx.id)
    setShowModal(true)
  }

  function handleSave() {
    if (!form.desc || !form.amount || !form.date) return
    if (editId) {
      editTransaction({ ...form, amount: parseFloat(form.amount), id: editId })
    } else {
      addTransaction({ ...form, amount: parseFloat(form.amount) })
    }
    setShowModal(false)
    setForm(emptyForm)
    setEditId(null)
  }

  const modal = showModal && createPortal(
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center 
      justify-center z-[9999] p-4"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md
        shadow-xl border border-gray-100 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-5">
          {editId ? "Edit transaction" : "Add transaction"}
        </h3>

        <div className="flex flex-col gap-4">
          {[
            { label: "Description", key: "desc", type: "text", placeholder: "e.g. Grocery shopping" },
            { label: "Amount (₹)", key: "amount", type: "number", placeholder: "0" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 
                dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-gray-700 
                dark:text-gray-200 outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
                Category
              </label>
              <select
                value={form.cat}
                onChange={(e) => setForm({ ...form, cat: e.target.value })}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 
                dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-gray-700 
                dark:text-gray-200 outline-none focus:border-emerald-400 transition-colors"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 
                dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-gray-700 
                dark:text-gray-200 outline-none focus:border-emerald-400 transition-colors"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 
              dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-gray-700 
              dark:text-gray-200 outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 
            border border-gray-200 dark:border-gray-600 rounded-lg 
            hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 
            text-white rounded-lg transition-all active:scale-95"
          >
            {editId ? "Save changes" : "Add"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )

  return (
    <>
      {modal}
      <div className="flex flex-col gap-6 bg-gradient-to-br from-cyan-500 via-sky-50 to-indigo-500 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 rounded-2xl p-3 sm:p-5 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-0.5">

        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white tracking-tight">
              Transactions
            </h2>
            <p className="text-sm text-white/80 font-bold mt-1">
              {filtered.length} record{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          {role === "admin" && (
            <button
              onClick={openAdd}
              className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white 
              text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              + Add
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 
            dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300
            placeholder:text-gray-300 dark:placeholder:text-gray-600 outline-none
            focus:border-emerald-400 transition-colors"
          />
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
              rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 outline-none
              focus:border-emerald-400 transition-colors cursor-pointer"
            >
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
              rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 outline-none
              focus:border-emerald-400 transition-colors cursor-pointer"
            >
              <option value="date-desc">Newest first</option>
              <option value="date-asc">Oldest first</option>
              <option value="amount-desc">Highest amount</option>
              <option value="amount-asc">Lowest amount</option>
            </select>

            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
              rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 outline-none
              focus:border-emerald-400 transition-colors cursor-pointer"
            >
              <option value="none">No grouping</option>
              <option value="month">By Month</option>
              <option value="category">By Category</option>
              <option value="type">By Type</option>
            </select>
          </div>
        </div>

        {/* Grouped tables */}
        <div className="flex flex-col gap-4">
          {Object.entries(grouped).map(([groupLabel, groupTxs]) => (
            <div key={groupLabel}>
              {groupBy !== "none" && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                    {groupLabel}
                  </span>
                  <span className="text-xs text-white/50">
                    {groupTxs.length} record{groupTxs.length !== 1 ? "s" : ""}
                  </span>
                  <div className="flex-1 h-px" />
                  <span className="text-xs font-semibold text-gray-800">
                    {/* Group total */}
                    {(() => {
                      const total = groupTxs.reduce((sum, t) =>
                        t.type === "income" ? sum + t.amount : sum - t.amount, 0)
                      return (
                        <span className={total >= 0 ? "text-emerald-300" : "text-red-300"}>
                          {total >= 0 ? "+" : ""}₹{Math.abs(total).toLocaleString("en-IN")}
                        </span>
                      )
                    })()}
                  </span>
                </div>
              )}
              <TransactionTable
                transactions={groupTxs}
                onEdit={openEdit}
                onAdd={openAdd}
              />
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
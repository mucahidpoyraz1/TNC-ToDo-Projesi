import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899']

const ExpenseChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense')
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})

  const data = Object.entries(categoryTotals).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length],
  }))

  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-xl p-6 mb-6 text-center text-gray-400">
        Henüz harcama kaydı yok. İşlem ekleyerek grafik oluşturun.
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
        Kategori Bazlı Harcama Dağılımı
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              value.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' ₺'
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ExpenseChart

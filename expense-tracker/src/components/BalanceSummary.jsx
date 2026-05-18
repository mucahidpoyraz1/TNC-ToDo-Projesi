import React from 'react'

const BalanceSummary = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const net = income - expense

  const fmt = (n) =>
    n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white shadow rounded-xl p-5 border-l-4 border-green-500">
        <p className="text-sm font-medium text-gray-500 mb-1">Toplam Gelir</p>
        <p className="text-2xl font-bold text-green-600">+{fmt(income)} ₺</p>
      </div>
      <div className="bg-white shadow rounded-xl p-5 border-l-4 border-red-500">
        <p className="text-sm font-medium text-gray-500 mb-1">Toplam Gider</p>
        <p className="text-2xl font-bold text-red-600">-{fmt(expense)} ₺</p>
      </div>
      <div className={`bg-white shadow rounded-xl p-5 border-l-4 ${net >= 0 ? 'border-blue-500' : 'border-orange-500'}`}>
        <p className="text-sm font-medium text-gray-500 mb-1">Net Bakiye</p>
        <p className={`text-2xl font-bold ${net >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
          {net >= 0 ? '+' : ''}{fmt(net)} ₺
        </p>
      </div>
    </div>
  )
}

export default BalanceSummary

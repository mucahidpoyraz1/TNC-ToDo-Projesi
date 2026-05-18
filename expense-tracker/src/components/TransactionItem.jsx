import React from 'react'

const categoryColors = {
  Gıda: 'bg-yellow-100 text-yellow-800',
  Ulaşım: 'bg-blue-100 text-blue-800',
  Faturalar: 'bg-purple-100 text-purple-800',
  Eğlence: 'bg-pink-100 text-pink-800',
  Sağlık: 'bg-green-100 text-green-800',
  Maaş: 'bg-emerald-100 text-emerald-800',
  Diğer: 'bg-gray-100 text-gray-700',
}

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const { date, description, category, amount, type } = transaction
  const formattedDate = new Date(date).toLocaleDateString('tr-TR')
  const amountClass = type === 'income' ? 'text-green-600' : 'text-red-600'
  const sign = type === 'income' ? '+' : '-'
  const badgeClass = categoryColors[category] || 'bg-gray-100 text-gray-700'

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formattedDate}</td>
      <td className="px-4 py-3 text-sm text-gray-800">{description}</td>
      <td className="px-4 py-3 text-sm">
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badgeClass}`}>
          {category}
        </span>
      </td>
      <td className={`px-4 py-3 text-sm font-semibold ${amountClass}`}>
        {sign}{amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
      </td>
      <td className="px-4 py-3 text-right text-sm space-x-2">
        <button
          onClick={() => onEdit(transaction)}
          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="text-red-500 hover:text-red-700 font-medium hover:underline"
        >
          Sil
        </button>
      </td>
    </tr>
  )
}

export default TransactionItem

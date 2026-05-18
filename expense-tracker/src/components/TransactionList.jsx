import React from 'react'
import TransactionItem from './TransactionItem'

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white shadow rounded-xl p-10 text-center text-gray-400">
        İşlem bulunamadı. Yeni bir işlem ekleyin.
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tarih
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Açıklama
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Kategori
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tutar
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map(t => (
            <TransactionItem key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList

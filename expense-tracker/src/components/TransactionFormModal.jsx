import React, { useState, useEffect } from 'react'

const categories = ['Gıda', 'Ulaşım', 'Faturalar', 'Eğlence', 'Sağlık', 'Maaş', 'Diğer']

const initialState = {
  type: 'expense',
  category: 'Gıda',
  description: '',
  amount: '',
  date: new Date().toISOString().slice(0, 10),
}

const TransactionFormModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')

  useEffect(() => {
    if (transaction) {
      setForm({
        type: transaction.type,
        category: transaction.category,
        description: transaction.description,
        amount: transaction.amount.toString(),
        date: transaction.date,
      })
    } else {
      setForm(initialState)
    }
    setError('')
  }, [transaction, isOpen])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.description.trim()) {
      setError('Açıklama alanı boş bırakılamaz.')
      return
    }
    if (!form.amount || parseFloat(form.amount) <= 0) {
      setError('Geçerli bir tutar giriniz.')
      return
    }
    onSave({ ...form, amount: parseFloat(form.amount) })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            {transaction ? 'İşlemi Düzenle' : 'Yeni İşlem Ekle'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tür</label>
            <div className="flex gap-6">
              {[
                { value: 'expense', label: 'Gider', color: 'text-red-600' },
                { value: 'income', label: 'Gelir', color: 'text-green-600' },
              ].map(({ value, label, color }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={value}
                    checked={form.type === value}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span className={`text-sm font-medium ${color}`}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="örn. Market alışverişi"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tutar (₺)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
            >
              {transaction ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionFormModal

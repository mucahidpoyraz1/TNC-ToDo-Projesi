import React, { useState, useEffect } from 'react'
import BalanceSummary from '../components/BalanceSummary'
import ExpenseChart from '../components/ExpenseChart'
import FilterBar from '../components/FilterBar'
import TransactionList from '../components/TransactionList'
import TransactionFormModal from '../components/TransactionFormModal'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([])
  const [filterCategory, setFilterCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTransaction, setEditTransaction] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('transactions')
    if (stored) setTransactions(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const handleSave = (data) => {
    if (editTransaction) {
      setTransactions(prev =>
        prev.map(t => t.id === editTransaction.id ? { ...data, id: editTransaction.id } : t)
      )
      setEditTransaction(null)
    } else {
      const newTransaction = {
        ...data,
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      }
      setTransactions(prev => [newTransaction, ...prev])
    }
  }

  const handleEdit = (transaction) => {
    setEditTransaction(transaction)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditTransaction(null)
  }

  const confirmDelete = (id) => {
    setDeleteId(id)
  }

  const handleDeleteConfirm = () => {
    setTransactions(prev => prev.filter(t => t.id !== deleteId))
    setDeleteId(null)
  }

  const filtered = transactions
    .filter(t => {
      if (filterCategory && t.category !== filterCategory) return false
      if (searchQuery && !t.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
    .sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    )

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <h1 className="text-3xl font-bold text-gray-800">Harcama Takip</h1>
          <p className="text-sm text-gray-500 mt-1">Gelir ve giderlerinizi kolayca yönetin</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <BalanceSummary transactions={transactions} />
        <ExpenseChart transactions={transactions} />
        <FilterBar
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onAddClick={() => setModalOpen(true)}
        />
        <TransactionList
          transactions={filtered}
          onEdit={handleEdit}
          onDelete={confirmDelete}
        />
      </main>

      <TransactionFormModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        transaction={editTransaction}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

export default DashboardPage

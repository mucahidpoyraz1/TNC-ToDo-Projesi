import React from 'react'

const categories = ['Tümü', 'Gıda', 'Ulaşım', 'Faturalar', 'Eğlence', 'Sağlık', 'Maaş', 'Diğer']

const FilterBar = ({
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  onAddClick,
}) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat === 'Tümü' ? '' : cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Açıklamada ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">En Yeni Önce</option>
          <option value="asc">En Eski Önce</option>
        </select>

        <button
          onClick={onAddClick}
          className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all"
        >
          + İşlem Ekle
        </button>
      </div>
    </div>
  )
}

export default FilterBar

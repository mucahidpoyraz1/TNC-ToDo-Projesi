import React from 'react'

const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
            !
          </div>
          <h2 className="text-base font-semibold text-gray-800">İşlemi Sil</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Bu işlemi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal

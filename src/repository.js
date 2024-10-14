// src/repository.js
class Repository {
  constructor() {
    this.data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
  }

  // Menghapus item berdasarkan id
  deleteItemById(id) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      return this.data.splice(index, 1)[0]; // Menghapus dan mengembalikan item yang dihapus
    }
    return null; // Mengembalikan null jika item tidak ditemukan
  }

  // Metode lain...
}

export default Repository;

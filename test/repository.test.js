// test/repository.test.js
import { expect } from 'chai';
import Repository from '../src/repository.js';

describe('Repository Tests', () => {
  let repository;

  beforeEach(() => {
    repository = new Repository();
  });

  it('should delete an item by ID', () => {
    const item = repository.deleteItemById(1); // Menghapus item dengan id 1
    expect(item).to.deep.equal({ id: 1, name: 'Item 1' }); // Memastikan item yang dihapus sesuai
  });

  it('should return null if the item does not exist', () => {
    const item = repository.deleteItemById(3); // Menghapus item dengan id yang tidak ada
    expect(item).to.be.null; // Memastikan hasilnya null
  });

  it('should maintain remaining items after deletion', () => {
    repository.deleteItemById(1); // Menghapus item dengan id 1
    expect(repository.data).to.have.lengthOf(1); // Memastikan ada 1 item tersisa
    expect(repository.data).to.deep.equal([{ id: 2, name: 'Item 2' }]); // Memastikan item tersisa benar
  });

  it('should delete the correct item when multiple items exist', () => {
    const item = repository.deleteItemById(2); // Menghapus item dengan id 2
    expect(item).to.deep.equal({ id: 2, name: 'Item 2' }); // Memastikan item yang dihapus sesuai
    expect(repository.data).to.have.lengthOf(1); // Memastikan ada 1 item tersisa
  });

  it('should return the deleted item for the last item', () => {
    const item = repository.deleteItemById(1); // Menghapus item dengan id 1
    expect(item).to.deep.equal({ id: 1, name: 'Item 1' }); // Memastikan item yang dihapus sesuai
  });
});

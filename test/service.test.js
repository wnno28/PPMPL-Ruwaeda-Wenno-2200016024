import sinon from 'sinon';
import { expect } from 'chai';
import Service from '../src/service.js'; // Sesuaikan jalurnya
import PrimaryRepository from '../src/repository.js';
import SecondaryRepository from '../src/secondaryRepository.js';

describe('Service Integration Tests', () => {
  let service;
  let primaryRepositoryStub;
  let secondaryRepositoryStub;

  beforeEach(() => {
    primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
    secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
    service = new Service();
    service.primaryRepository = primaryRepositoryStub;
    service.secondaryRepository = secondaryRepositoryStub;
  });

  it('should delete an item by ID from primary repository', () => {
    const item = { id: 1, name: 'Item 1' };
    primaryRepositoryStub.deleteItemById.withArgs(1).returns(item);

    const result = service.deleteItemById(1);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.deleteItemById.calledOnceWith(1)).to.be.true;
    expect(secondaryRepositoryStub.deleteItemById.notCalled).to.be.true;
  });

  it('should delete an item by ID from secondary repository if not found in primary', () => {
    primaryRepositoryStub.deleteItemById.withArgs(2).returns(null);
    const item = { id: 2, name: 'Item 2' };
    secondaryRepositoryStub.deleteItemById.withArgs(2).returns(item);

    const result = service.deleteItemById(2);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.deleteItemById.calledOnceWith(2)).to.be.true;
    expect(secondaryRepositoryStub.deleteItemById.calledOnceWith(2)).to.be.true;
  });

  it('should throw an error if item is not found in both repositories', () => {
    primaryRepositoryStub.deleteItemById.withArgs(3).returns(null);
    secondaryRepositoryStub.deleteItemById.withArgs(3).returns(null);

    expect(() => service.deleteItemById(3)).to.throw('Item not found'); // Ubah pesan sesuai implementasi
    expect(primaryRepositoryStub.deleteItemById.calledOnceWith(3)).to.be.true;
    expect(secondaryRepositoryStub.deleteItemById.calledOnceWith(3)).to.be.true;
  });
});

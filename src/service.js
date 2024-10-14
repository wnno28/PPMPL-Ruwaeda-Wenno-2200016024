import PrimaryRepository from './repository.js'; // Pastikan jalur benar
import SecondaryRepository from './secondaryRepository.js'; // Pastikan jalur benar

class Service {
  constructor() {
    this.primaryRepository = new PrimaryRepository();
    this.secondaryRepository = new SecondaryRepository();
  }

  getItemById(id) {
    let item = this.primaryRepository.getItemById(id);
    if (!item) {
      item = this.secondaryRepository.getItemById(id);
    }
    if (!item) {
      throw new Error('Item not found in both repositories');
    }
    return item;
  }

  deleteItemById(id) {
    let item = this.primaryRepository.deleteItemById(id);
    if (!item) {
      item = this.secondaryRepository.deleteItemById(id);
    }
    if (!item) {
      throw new Error('Item not found in both repositories');
    }
    return item;
  }
}

export default Service;

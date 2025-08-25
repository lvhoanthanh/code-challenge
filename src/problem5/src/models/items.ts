import { AppDataSource } from '../database/data-source';
import { Item } from '../entities/Item';

export class ItemModel {
  private repo = AppDataSource.getRepository(Item);

  create(data: Partial<Item>) {
    return this.repo.create(data);
  }

  save(item: Item) {
    return this.repo.save(item);
  }

  findAll(name?: string) {
    return this.repo.find({
      where: name ? { name } : {},
    });
  }

  findById(id: string) {
    return this.repo.findOneBy({ id });
  }

  merge(item: Item, data: Partial<Item>) {
    return this.repo.merge(item, data);
  }

  remove(item: Item) {
    return this.repo.remove(item);
  }
}
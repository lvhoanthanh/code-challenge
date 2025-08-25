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

  async getPaginatedAndFiltered({
    name,
    minPrice,
    maxPrice,
    orderBy = "name",
    order = "DESC",
    page = 1,
    pageSize = 10,
  }: {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    orderBy?: string;
    order?: "ASC" | "DESC";
    page?: number;
    pageSize?: number;
  }) {
    const qb = this.repo.createQueryBuilder("item");

    if (name) {
      qb.andWhere("item.name ILIKE :name", { name: `%${name}%` });
    }
    if (minPrice !== undefined) {
      qb.andWhere("item.price >= :minPrice", { minPrice });
    }
    if (maxPrice !== undefined) {
      qb.andWhere("item.price <= :maxPrice", { maxPrice });
    }
    qb.orderBy(`item.${orderBy}`, order);
    qb.skip((page - 1) * pageSize).take(pageSize);

    const [items, total] = await qb.getManyAndCount();
    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
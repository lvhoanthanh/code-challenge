import { AppDataSource } from './data-source';
import { Item } from '../entities/Item';

async function seed() {
  const dataSource = await AppDataSource.initialize();
  const repo = dataSource.getRepository(Item);

  const items = [
    { name: 'Item 1', description: 'Description item 1', price: 100 },
    { name: 'Item 2', description: 'Description item 2', price: 200 },
    { name: 'Item 3', description: 'Description item 3', price: 300 }
  ];

  for (const data of items) {
    const item = repo.create(data);
    await repo.save(item);
  }

  console.log('Seed done!');
  process.exit(0);
}

seed();
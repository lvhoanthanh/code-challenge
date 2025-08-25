# ExpressJS + TypeScript + PostgreSQL CRUD Backend

## 1. PostgreSQL Setup

Create database:
```sql
CREATE DATABASE resourceDB;
```
Run migrations to create tables:
```sh
yarn migration:run
```

## 2. Seed Sample Data

```sh
yarn seed
```

## 3. Install & Run Application

```sh
yarn install
yarn build
yarn start
```
Or run in development mode:
```sh
yarn dev
```

## 4. API Endpoints

- `POST /api/items` - Create a new item  
- `GET /api/items` - Get list of items (filter by name: ?name=abc)  
- `GET /api/items/:id` - Get item details  
- `PUT /api/items/:id` - Update an item 
- `DELETE /api/items/:id` - Delete item  

## 5. Database Configuration

Edit the src/database/data-source.ts file to match your user, password, and database.
Or configure via .env for easier management

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=resourceDB
```

## 6. DevOps Script

To reset the entire database and reseed sample data from scratch, use:

```sh
yarn devops:clean
```

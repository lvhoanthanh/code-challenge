import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Item } from "../entities/Item";
import { validate } from "class-validator";
import { validate as isUuid } from "uuid";

class ItemController {
  private itemRepo = AppDataSource.getRepository(Item);

  async create(req: Request, res: Response) {
  try {
    const { name, description, price } = req.body;
    
    if (!name || !description || price === undefined) {
      return res.status(400).json({ message: "name, description and price are required" });
    }

    const item = this.itemRepo.create({ name, description, price });
    const errors = await validate(item);
    if (errors.length > 0) return res.status(400).json(errors);

    const saved = await this.itemRepo.save(item);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

  async list(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const items = await this.itemRepo.find({
        where: name ? { name: String(name) } : {},
      });
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!isUuid(id)) return res.status(400).json({ message: "Invalid ID format" });

      const item = await this.itemRepo.findOneBy({ id });
      if (!item) return res.status(404).json({ message: "Item not found" });

      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!isUuid(id)) return res.status(400).json({ message: "Invalid ID format" });

      const item = await this.itemRepo.findOneBy({ id });
      if (!item) return res.status(404).json({ message: "Item not found" });

      this.itemRepo.merge(item, req.body);
      const errors = await validate(item);
      if (errors.length > 0) return res.status(400).json(errors);

      const saved = await this.itemRepo.save(item);
      res.json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!isUuid(id)) return res.status(400).json({ message: "Invalid ID format" });

      const item = await this.itemRepo.findOneBy({ id });
      if (!item) return res.status(404).json({ message: "Item not found" });

      await this.itemRepo.remove(item);
      res.json({ message: "Item deleted", item });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ItemController();

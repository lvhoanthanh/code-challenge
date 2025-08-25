import { Router } from 'express';
import ItemController from '../controllers/itemController';

const router = Router();

router.post('/', ItemController.create.bind(ItemController));
router.get('/', ItemController.list.bind(ItemController));
router.get('/:id', ItemController.get.bind(ItemController));
router.put('/:id', ItemController.update.bind(ItemController));
router.delete('/:id', ItemController.delete.bind(ItemController));

export default router;
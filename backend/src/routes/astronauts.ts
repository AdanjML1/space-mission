import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { list, getOne, create, update, remove } from '../controllers/astronauts.controller';

const router = Router();
router.use(requireAuth);
router.get('/', list);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;

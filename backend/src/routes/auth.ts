import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
const router = Router();

router.post('/register', register); // crea admin
router.post('/login', login);       // devuelve JWT

export default router;

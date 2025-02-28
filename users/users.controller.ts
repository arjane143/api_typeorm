import { Router } from 'express';
import { UserService } from './user.service';

const router = Router();
const userService = new UserService();

router.get('/', async (req, res, next) => {
    try { res.json(await userService.getAll()); }
    catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
    try { res.json(await userService.getById(Number(req.params.id))); }
    catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
    try { 
        await userService.create(req.body);
        res.json({ message: "User created" }); 
    }
    catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
    try { res.json(await userService.update(Number(req.params.id), req.body)); }
    catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
    try { res.json(await userService.delete(Number(req.params.id))); }
    catch (err) { next(err); }
});

export default router;
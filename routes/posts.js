import express from 'express';
import { publicPosts, privatePosts } from '../db.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/public', (req, res) => {
    res.json(publicPosts);
});

router.get('/private', checkAuth, (req, res) => {
    res.json(privatePosts);
});

export { router as postsRouter };

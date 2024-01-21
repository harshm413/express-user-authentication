import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { postsRouter } from './routes/posts.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.listen(5000, () => {
    console.log('Server running at PORT = 5000');
});

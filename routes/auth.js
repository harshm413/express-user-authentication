import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const users = [];

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    let user = users.find((user) => user.email === email);

    if (user) {
        res.json({
            msg: 'This user already exists',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        email,
        password: hashedPassword,
    });

    const token = await jwt.sign({ email }, 'my-secret-key', {
        expiresIn: 360000,
    });

    res.json({
        token,
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = users.find((user) => user.email === email);

    if (!user) {
        res.json({
            msg: 'Invalid Credentials',
        });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.json({
            msg: 'Invalid Credentials',
        });
    }

    const token = await jwt.sign({ email }, 'my-secret-key', {
        expiresIn: 360000,
    });

    res.json({
        token,
    });
});

router.get('/all', (req, res) => {
    res.json(users);
});

export { router as authRouter };

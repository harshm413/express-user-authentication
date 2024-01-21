import jwt from 'jsonwebtoken';

const checkAuth = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.json({
            msg: 'No token found',
        });
    }

    try {
        const user = await jwt.verify(token, 'my-secret-key');
        req.user = user.email;
        next();
    } catch (e) {
        res.json({
            msg: 'Invalid Token',
        });
    }
};
export { checkAuth };

// ----- import services -----
import { loginUser } from '../services/userTokenService.js';

const renderLoginView = (req, res) => res.render('login', { h1: 'Login', action: 'login' });

const handleLogin = async (req, res, next) => {
    const { username, password } = req.body;
    const cookiesArr = await loginUser(username, password);

    if (cookiesArr) {
        const [accessTokenCookie, refreshTokenCookie] = cookiesArr;

        res.cookie(accessTokenCookie.name, accessTokenCookie.value, accessTokenCookie.options);
        res.cookie(refreshTokenCookie.name, refreshTokenCookie.value, refreshTokenCookie.options);

        return res.redirect(303, '/protected');
    }

    return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials.'
    });
};

export {
    renderLoginView,
    handleLogin
};


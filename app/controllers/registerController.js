// ----- import services -----
import { registerUser } from '../services/userService.js';

const renderRegisterView = (req, res) => res.render('register', { h1: 'Register', action: 'register' });

const handleRegister = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { name } = await registerUser(username, password);

        return res.status(201).json({
            status: 'Success',
            message: `User with the name: "${name}" has been registered.`
        });
    } catch (err) {
        if (err.code === 11000) {
            console.error(err.message);

            return res.status(409).json({
                status: 'error',
                message: `User with the name "${err.keyValue.name}" already exists, try another name.`
            });
        }

        return next(err);
    }
};

export {
    renderRegisterView,
    handleRegister
};
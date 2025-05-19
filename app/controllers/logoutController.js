const handleLogout = (req, res) => res.redirect(303, '/login');

export {
    handleLogout
};
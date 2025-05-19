const handleProtectedView = (req, res) => {
    const { username } = req.user;

    return res.render('protected', { h1: 'Protected', username });
};

export {
    handleProtectedView
};
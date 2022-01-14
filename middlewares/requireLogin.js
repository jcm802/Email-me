module.exports = (req, res, next) => {
    // if the user isn't logged in, send back an error and message
    if(!req.user) return res.status(401).send({ error: 'You must log in!'});
    next();
};
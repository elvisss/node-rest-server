const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    });
}

let verifyAdminRole = (req, res, next) => {
    let user = req.user;

    if ( user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'User is not admin'
            }
        });
    }
    next();
}

let verifyTokenImg = (req, res, next) => {
    let token = req.query.token || '';

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    });
}

module.exports = {
    verifyToken,
    verifyAdminRole,
    verifyTokenImg
}

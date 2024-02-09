const responseStatus = require('../utils/response-status');

const authMiddleware = (req, res, next) => {
    const {token} = req.query;
    if(token && token === '123'){
        req.user =  {...authUser};
        next();
    } else {
        res.status(responseStatus.UNAUTHENTICATED);
    }
}

const roleMiddleware = (req, res, next) => {
    const userRole = req.role;
    if(userRole && userRole === 'admin'){
        //req.user =  {...authUser};
        next();
    } else {
        res.status(responseStatus.FORBIDDEN);
    }
}

module.exports = authMiddleware;
module.exports = roleMiddleware;
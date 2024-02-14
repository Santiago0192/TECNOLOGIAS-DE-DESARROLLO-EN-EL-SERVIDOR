const responseStatus = require('../utils/response-status');

const authMiddleware = (req, res, next) => {
    const {token} = req.query;
    if(token && token === '12345'){
        req.user =  {...authUser};
        next();
    } else {
        res.status(responseStatus.UNAUTHENTICATED);
    }
}

const roleMiddleware = (req, res, next) => {
    const userRole = req.body.role;
    if(!userRole){
        res.status(responseStatus.UNAUTHENTICATED);
    }

    if(!userRole.includes(userRole)){
        res.status(responseStatus.FORBIDDEN);
        //req.user =  {...authUser};
    } else {
        next();
    }
}

module.exports = authMiddleware;
module.exports = roleMiddleware;
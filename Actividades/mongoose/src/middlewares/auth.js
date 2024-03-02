const responseStatus = require('../utils/response-status');

const roles = ['admin','user'];

const authMiddleware = (req, res, next) => {
    const token = req.query.token;
    if(token && token === '12345'){
        //req.user =  {...authUser};
        next();
    } else {
        return res.status(responseStatus.UNAUTHENTICATED).send('Unauthenticated');
    }
}

const roleMiddleware = (req, res, next) => {
    const userRole = req.query.role;
    if(!userRole){
        return res.status(responseStatus.UNAUTHENTICATED).send('Missing role');
    }

    if(!roles.includes(userRole)){
        return res.status(responseStatus.FORBIDDEN).send('Invalid role');
        //req.user =  {...authUser};
    } else {
        next();
    }
}

module.exports = {authMiddleware,roleMiddleware};
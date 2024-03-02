const crypto = require('crypto');

module.export = function(pwd){
    pwd = pwd ?? '';
    const hashedPwd = crypto.scrypt(pwd, process.env.SECRET_KEY, 24);
    return hashedPwd .toString('hex');
}
const crypto = require('crypto');

const SECRET_KEY = 'Put_Your_Secret';

const verifySignature = (req, res, next) => {
    const payload = req.body;
    const signature = req.headers['x-hook-signature'];
    const hmac = crypto.createHmac('md5', SECRET_KEY);

    hmac.setEncoding('base64');
    hmac.write(JSON.stringify(payload));
    hmac.end();

    const hash = hmac.read();

    if (hash === signature) {
        next();
    } else {
        res.sendStatus(403);
    }
}


module.exports = { verifySignature };
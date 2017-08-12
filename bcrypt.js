const bcrypt = require('bcrypt-nodejs');

function hash(data, salt, progress) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data, salt, progress, (err, hash) => {
            if(err) {
                return reject(err);
            }

            resolve(hash);
        });
    });
}

function compare(data, encryped) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(data, encryped, (err, res) => {
            if(err) {
                return reject(err);
            }

            resolve(res);
        });
    });
}

module.exports = {
    hash: hash,
    compare: compare
};
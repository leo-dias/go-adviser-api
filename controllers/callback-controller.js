'use strict';

module.exports = (err, res, result) => {
    if (err) return res.status(400).send(err);

    if (result.length === 0) return res.status(404).send();

    return res.send(result);
}
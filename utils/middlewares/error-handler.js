const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
}

function errorHandler(err, req, res, next) {
    let { output: { statusCode, payload } } = err;

    if (err.name.toUpperCase().includes('SEQUELIZE')) {
        payload.message = err.stack.substring(err.stack.indexOf(':') + 2, err.stack.indexOf('\n'));

        if (err.original.sqlMessage){
            payload.message = payload.message + '. ' + err.original.sqlMessage;
        }
    }
    if (err.statusCode && err.statusCode >= 400 && err.statusCode <= 499) {
        statusCode = err.statusCode;
        payload.statusCode = statusCode;
        payload.error = err.error || 'Bad request';
        payload.message = err.message;
    }

    res.status(statusCode);
    res.json({
        success: false,
        payload: null,
        error: payload
    });
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHandler
}

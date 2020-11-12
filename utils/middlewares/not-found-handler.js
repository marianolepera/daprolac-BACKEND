const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
    const { output: { statusCode, payload } } = boom.notFound('Recurso no encontrado');
    payload.error = 'Recurso no encontrado';

    res.status(statusCode).json({
        success: false,
        payload: null,
        error: payload,
    });
}

module.exports = notFoundHandler;

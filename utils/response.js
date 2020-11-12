class CustomError extends Error {
    constructor(message, statusCode, error) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }
}

exports.success = (req, res, status, payload) => {
    let statusCode = status || 200;

    console.log('Operacion realizada con exito!', payload);

    res.status(statusCode).json({
        success: true,
        payload: payload,
        error: null
    })
}

exports.customError = (message, statusCode= 400, error = 'Bad request') => {
    return new CustomError(message, statusCode, error);
}

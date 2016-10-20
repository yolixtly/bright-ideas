exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://localhost/boards/' :
        'mongodb://localhost/boards/dev');
exports.HOST = process.env.HOST;
exports.PORT = 8080 || process.env.PORT;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const start = Date.now();
    // Log request details
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log(`Headers:`, req.headers);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log(`Body:`, JSON.stringify(req.body, null, 2));
    }
    if (req.query && Object.keys(req.query).length > 0) {
        console.log(`Query:`, JSON.stringify(req.query, null, 2));
    }
    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function (chunk, encoding, cb) {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
        // Match the original signature and return value
        return originalEnd.call(this, chunk, encoding, cb);
    };
    next();
};
exports.requestLogger = requestLogger;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogs = void 0;
var audit = require('express-requests-logger');
function requestLogs(app) {
    app.use(audit({
        excludeURLs: ['/api/health', "metrics"], // Exclude paths which enclude 'health' & 'metrics'
        request: {
            maskBody: ["password"], // Mask 'password' field in incoming requests
            excludeHeaders: ["authorization"], // Exclude 'authorization' header from requests
            excludeBody: ["creditCard"], // Exclude 'creditCard' field from requests body
            maskHeaders: ["header1"], // Mask 'header1' header in incoming requests
            maxBodyLength: 50 // limit length to 50 chars + '...'
        },
        response: {
            maskBody: ["session_token"], // Mask 'session_token' field in response body
            excludeHeaders: ["*"], // Exclude all headers from responses,
            excludeBody: ["*"], // Exclude all body from responses
            maskHeaders: ["header1"], // Mask 'header1' header in incoming requests
            maxBodyLength: 50 // limit length to 50 chars + '...'
        },
    }));
}
exports.requestLogs = requestLogs;
//# sourceMappingURL=requestLogs.js.map
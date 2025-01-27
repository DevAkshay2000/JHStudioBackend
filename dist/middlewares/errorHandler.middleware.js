"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, req, res, next) {
    // console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map
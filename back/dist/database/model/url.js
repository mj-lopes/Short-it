"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlModel = void 0;
const mongoose_1 = require("mongoose");
const urlSchema = new mongoose_1.Schema({
    originURL: { required: true, type: String },
    hash: { required: true, type: String },
    shortURL: { required: true, type: String },
});
exports.urlModel = (0, mongoose_1.model)("url", urlSchema);
//# sourceMappingURL=url.js.map
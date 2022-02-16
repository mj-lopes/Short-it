"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const URL_controller_1 = __importDefault(require("./Controller/URL.controller"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const cors_1 = __importDefault(require("cors"));
const MongoConnection_1 = __importDefault(require("./database/MongoConnection"));
const api = (0, express_1.default)();
api.use((0, cors_1.default)());
api.use(express_1.default.urlencoded({ extended: true }));
api.use(express_1.default.json());
api.post("/shorten", URL_controller_1.default.shorten);
api.get("/:hash", URL_controller_1.default.redirect);
api.get("/", (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.OK).send({ ok: "Tudo no jeito!" });
});
MongoConnection_1.default.connect();
api.listen(5000, () => console.log("Api rodando na porta 5000"));
//# sourceMappingURL=index.js.map
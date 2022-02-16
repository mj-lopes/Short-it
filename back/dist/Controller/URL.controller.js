"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const shortid_1 = __importDefault(require("shortid"));
const url_1 = require("../database/model/url");
const Constraints_1 = require("../config/Constraints");
class URLController {
    shorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originURL } = req.body;
            const urlCheck = yield url_1.urlModel.findOne({ originURL });
            if (urlCheck) {
                res.status(http_status_codes_1.StatusCodes.OK).send(JSON.stringify(urlCheck.shortURL));
                return;
            }
            const hash = shortid_1.default.generate();
            const shortURL = `${Constraints_1.config.BASE_URL}/${hash}`;
            const url = new url_1.urlModel({ hash, originURL, shortURL });
            yield url.save();
            res.status(http_status_codes_1.StatusCodes.OK).send({ shortURL });
        });
    }
    redirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash } = req.params;
            const queryResult = yield url_1.urlModel.findOne({ hash });
            if (queryResult) {
                res.redirect(queryResult.originURL);
                return;
            }
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({ Error: "URL not found" });
        });
    }
}
exports.default = new URLController();
//# sourceMappingURL=URL.controller.js.map
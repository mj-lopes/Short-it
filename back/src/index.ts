import url from "./Controller/URL.controller";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import database from "./database/MongoConnection";

const api = express();
api.use(cors());
api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.post("/shorten", url.shorten);
api.get("/:hash", url.redirect);

api.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).send({ ok: "Tudo no jeito!" });
});

database.connect();

api.listen(5000, () => console.log("Api rodando na porta 5000"));

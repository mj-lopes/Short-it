import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import shortId from "shortid";
import { urlModel, Url } from "../database/model/url";
import { config } from "../config/Constraints";

class URLController {
  async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;

    const urlCheck: Url = await urlModel.findOne({ originURL });

    if (urlCheck) {
      res.status(StatusCodes.OK).send(JSON.stringify(urlCheck.shortURL));
      return;
    }

    const hash = shortId.generate();
    const shortURL = `${config.BASE_URL}/${hash}`;

    const url = new urlModel({ hash, originURL, shortURL });
    await url.save();

    res.status(StatusCodes.OK).send({ shortURL });
  }

  async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const queryResult: Url = await urlModel.findOne({ hash });

    if (queryResult) {
      res.redirect(queryResult.originURL);
      return;
    }

    res.status(StatusCodes.NOT_FOUND).send({ Error: "URL not found" });
  }
}

export default new URLController();

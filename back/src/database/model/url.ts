import { Model, model, Schema } from "mongoose";

export interface Url {
  originURL: string;
  hash: string;
  shortURL: string;
}

const urlSchema = new Schema<Url>({
  originURL: { required: true, type: String },
  hash: { required: true, type: String },
  shortURL: { required: true, type: String },
});

export const urlModel = model<Url>("url", urlSchema);

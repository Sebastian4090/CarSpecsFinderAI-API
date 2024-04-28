import { Request, Response } from "express";
import { getDB } from "../utils/connect";
import { Db, ObjectId } from "mongodb";
import "../config";

const DB_COLLECTION = process.env.DB_COLLECTION as string;

const handleFetch = (req: Request, res: Response): Promise<object> => {
  const data: Db = getDB();

  return data
    .collection(DB_COLLECTION)
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((doc) => {
      if (doc !== null) {
        return doc;
      } else {
        throw new Error("Data not found");
      }
    })
    .catch((err) => {
      throw new Error("Unable to fetch data " + err);
    });
};

const handleData = (req: Request, res: Response, data: object) => {
  let type: string;
  // refactor type to match keys
  if (req.params.type.includes("=")) {
    type = req.params.type.split("=").join("/");
  } else {
    type = req.params.type;
  }

  for (const [key, value] of Object.entries(data)) {
    if (key === type) {
      return value;
    }
  }
};

const handleDataGet = (
  req: Request<{ id?: string; type?: string }>,
  res: Response
) => {
  handleFetch(req, res)
    .then((rawData) => {
      return rawData ? handleData(req, res, rawData) : Promise.reject();
    })
    .then((readyData) => res.status(200).json(readyData))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Can't get data");
    });
};

export default handleDataGet;

import { Request, Response } from "express";
import { getDB } from "../utils/connect";
import { Db, ObjectId } from "mongodb";

const handleFetch = async (req: Request, res: Response): Promise<object> => {
  return new Promise((resolve, reject) => {
    const data: Db = getDB();

    data.collection(String(process.env.DB_COLLECTION)).findOne({_id: new ObjectId(req.params.id)})
    .then(doc => {
      if (doc !== null) {
        resolve(doc);
      } else {
        reject("Unable to fetch data");
      }
    })
    .catch(err => {
      reject('Unable to fetch data');
    })
  })
}

const handleData = (req: Request, res: Response, data: object) => {
    for (const [key, value] of Object.entries(data)) {
      if (key === req.body.type) {
          return value;
      }
    }
}

const handleDataGet = (req: Request<{id? : string}>, res: Response) => {
  handleFetch(req, res)
  .then(rawData => {
    return rawData ? handleData(req, res, rawData) : Promise.reject();
  })
  .then(readyData => res.status(200).json(readyData))
  .catch(err => res.status(500).json("Can't get data"))
}


export default handleDataGet;
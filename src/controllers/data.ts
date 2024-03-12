import { Request, Response } from "express";
import { getDB } from "../utils/connect";
import { Db, ObjectId } from "mongodb";


const handleFetch = async (req: Request, res: Response): Promise<object> => {
    const data: Db = getDB();

    data.collection('carData').findOne({_id: new ObjectId(req.params.id)})
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json("Can't fetch data");
    })

    return data;
}

const handleDataGet = (req: Request<{id? : string}>, res: Response) => {
  handleFetch(req, res);

}


export default handleDataGet;
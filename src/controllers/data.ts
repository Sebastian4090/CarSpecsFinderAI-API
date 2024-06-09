import { Request, Response } from "express";
import { getDB } from "../utils/connect";
import { Db, ObjectId } from "mongodb";
// import "../config";

const DB_COLLECTION = "carData";

const handleFetch = async (req: Request): Promise<any> => {
  const data: Db = getDB();

  try {
    const doc = await data
      .collection(DB_COLLECTION)
      .findOne({ _id: new ObjectId(req.params.id) });

    if (doc !== null) {
      return doc;
    } else {
      throw new Error("Data not found");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Unable to fetch data:", err.message);
    }
    throw new Error("Unable to fetch data " + err);
  }
};

const handleData = (req: Request, data: any) => {
  let type: string;
  if (req.params.type.includes("=")) {
    type = req.params.type.split("=").join("/");
  } else {
    type = req.params.type;
  }

  return data[type] || null;
};

const handleDataGet = async (
  req: Request<{ id?: string; type?: string }>,
  res: Response
) => {
  try {
    const rawData = await handleFetch(req);
    const readyData = handleData(req, rawData);

    if (readyData !== null) {
      res.status(200).json(readyData);
    } else {
      res.status(404).json("Data type not found");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error message:", err.message);
      res.status(404).json("Data not found");
    } else {
      console.error("Unknown error:", err);
      res.status(500).json("Can't get data");
    }
  }
};

export default handleDataGet;

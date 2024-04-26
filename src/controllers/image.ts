import { Request, Response } from "express";
import { BaseResponse, getJson } from "serpapi";
import "../config";

const IMAGE_API_KEY = process.env.IMAGE_API_KEY as string;

const handleImageGet = async (req: Request<{ car: string }>, res: Response) => {
  try {
    getJson(
      {
        engine: "google_images",
        google_domain: "google.com",
        q: `${req.params.car} wikipedia`,
        gl: "pl",
        safe: "active",
        ijn: "0.1",
        tbs: "car",
        api_key: IMAGE_API_KEY,
      },
      (response: BaseResponse) => {
        res.status(200).json(response.images_results[0].original);
      }
    );
    // res
    //   .status(200)
    //   .json(
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/1997_Audi_A3_1.6_Front.jpg/240px-1997_Audi_A3_1.6_Front.jpg"
    //   );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json("Error fetching data");
    throw error;
  }
};

export default handleImageGet;

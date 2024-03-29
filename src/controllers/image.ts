import { Request, Response } from "express";
import { getJson } from "serpapi";
import "../config";

const IMAGE_API_KEY = process.env.IMAGE_API_KEY as string;

const handleImageGet = (req: Request<{ car: string }>, res: Response) => {
  console.log(req.params.car);

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
    (img) => {
      res.json(img.images_results[0].original);
    }
  );
};

export default handleImageGet;

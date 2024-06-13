import { Express, Request, Response } from "express";

import data from "./controllers/cars";
import handleImageGet from "./controllers/images";
import handleSpecsPost from "./controllers/specs";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.get(
    "/data/:id/:type",
    (req: Request<{ id?: string; type?: string }>, res: Response) =>
      data(req, res)
  );

  app.get("/image/:car", (req: Request<{ car: string }>, res: Response) =>
    handleImageGet(req, res)
  );

  app.post("/specs", (req: Request, res: Response) =>
    handleSpecsPost(req, res)
  );
};

export default routes;

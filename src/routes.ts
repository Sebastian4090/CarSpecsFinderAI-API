import { Express, Request, Response } from "express";

import data from "./controllers/data";
import handleSpecsPost from "./controllers/specs";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.get(
    "/data/:id/:type",
    (req: Request<{ id?: string; type?: string }>, res: Response) =>
      data(req, res)
  );

  app.post("/specs", (req: Request, res: Response) =>
    handleSpecsPost(req, res)
  );
};

export default routes;

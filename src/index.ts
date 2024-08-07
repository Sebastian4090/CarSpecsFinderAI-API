import express, { Express, urlencoded } from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import "./config";

import routes from "./routes";
import { connectDB } from "./utils/connect";
import log from "./utils/logger";
import keepAlive from "./keep_alive";

const PORT = Number(process.env.PORT);

const app: Express = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(compression());
app.use(cors());

app.get("/", (req, res) => {
  res.json("test test test");
});

app.listen(PORT, async () => {
  log.info(`Server is listening on port ${PORT}`);

  // database connection
  await connectDB();

  if (process.env.NODE_ENV !== "dev") {
    keepAlive();
  } else {
    console.log("Developer mode");
  }

  routes(app);
});

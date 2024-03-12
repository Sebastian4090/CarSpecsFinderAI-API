import { Db, MongoClient } from "mongodb";
import log from "./logger";

let dbConnection: Db;

const connectDB = () => {
    const dbURI = String(process.env.MONGO_URL);

    return MongoClient.connect(dbURI)
    .then((client) => {
        dbConnection = client.db(process.env.DB_NAME);
        log.info("MongoDB connected!");
    })
    .catch((err) => {
        log.error("Error connecting to MongoDB!");
        process.exit(1);
    })
}

const getDB = () => dbConnection;

export {connectDB, getDB};
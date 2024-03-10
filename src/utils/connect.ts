import mongoose from "mongoose";
import log from "./logger";

const connect = () => {
    const dbURI = String(process.env.MONGO_URL);

    return mongoose.connect(dbURI)
    .then(() => {
        log.info("MongoDB connected!");
    })
    .catch((err) => {
        log.error("Error connecting to MongoDB!");
        process.exit(1);
    })
}

export default connect;
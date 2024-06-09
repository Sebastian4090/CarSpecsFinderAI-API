import request from "supertest";
import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, Db, ObjectId } from "mongodb";
import handleDataGet from "./data";

const app = express();
app.use(express.json());
app.get("/data/:id/:type", handleDataGet);

let mongoServer: MongoMemoryServer;
let connection: MongoClient;
let db: Db;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  connection = await MongoClient.connect(uri);
  db = connection.db();
  jest.spyOn(require("../utils/connect"), "getDB").mockReturnValue(db);
});

afterAll(async () => {
  await connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await db.collection(process.env.DB_COLLECTION as string).deleteMany({});
});

describe("GET /data/:id/:type", () => {
  it("should return data if it exists", async () => {
    const testData = {
      _id: new ObjectId(),
      type: "exampleType",
      value: "exampleValue",
    };
    await db
      .collection(process.env.DB_COLLECTION as string)
      .insertOne(testData);

    const res = await request(app).get(`/data/${testData._id}/type`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(testData.type);
  });

  it("should return a 404 error when data is not found", async () => {
    const nonExistentId = new ObjectId();

    const res = await request(app).get(`/data/${nonExistentId}/type`);

    expect(res.status).toBe(404);
    expect(res.body).toBe("Data not found");
  });

  it('should handle the case where type string contains "="', async () => {
    const testData = { _id: new ObjectId(), "example/type": "exampleValue" };
    await db
      .collection(process.env.DB_COLLECTION as string)
      .insertOne(testData);

    const res = await request(app).get(`/data/${testData._id}/example=type`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(testData["example/type"]);
  });

  it("should return a 404 error when the type is not found in the data", async () => {
    const testData = { _id: new ObjectId(), someOtherType: "someValue" };
    await db
      .collection(process.env.DB_COLLECTION as string)
      .insertOne(testData);

    const res = await request(app).get(`/data/${testData._id}/nonexistentType`);

    expect(res.status).toBe(404);
    expect(res.body).toBe("Data type not found");
  });
});

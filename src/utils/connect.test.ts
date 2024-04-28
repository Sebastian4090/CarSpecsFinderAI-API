import { connectDB, getDB } from "./connect"; // Update this with the correct path to your module
import { MongoClient, Db } from "mongodb";

jest.mock("mongodb");

describe("connectDB function", () => {
  let mockDbInstance: Db;

  beforeEach(() => {
    mockDbInstance = {} as Db;
    (MongoClient.connect as jest.Mock).mockResolvedValue({
      db: jest.fn().mockReturnValue(mockDbInstance),
    });
  });

  it("should connect to MongoDB and set dbConnection on success", async () => {
    await connectDB();

    expect(MongoClient.connect).toHaveBeenCalledWith(
      process.env.MONGO_URL as string
    );
    expect(getDB()).toBe(mockDbInstance);
  });

  it("should log error and exit process on connection failure", async () => {
    const mockError = new Error("Connection failed");
    (MongoClient.connect as jest.Mock).mockRejectedValue(mockError);
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {}); // Mocking console.error
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit() was called");
    }); // Mocking process.exit

    try {
      await connectDB();
    } catch (error) {
      console.error("Error connecting to MongoDB!"); // Log error message
    }

    expect(exitSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error connecting to MongoDB!"
    );
  });
});

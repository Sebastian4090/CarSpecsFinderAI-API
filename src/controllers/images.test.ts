import request from "supertest";
import express from "express";
import handleImageGet from "./images";

const app = express();

app.get("/image/:car", handleImageGet);

jest.mock("serpapi", () => ({
  getJson: jest.fn(),
}));

describe("GET /image/:car", () => {
  it("responds with JSON containing the image URL", async () => {
    const car = "test_car";
    const expectedURL = "test_URL";

    require("serpapi").getJson.mockImplementation(
      (options: any, callback: (response: any) => void) => {
        const response = {
          images_results: [
            {
              original: expectedURL,
            },
          ],
        };
        callback(response);
      }
    );

    const res = await request(app).get(`/image/${car}`);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expectedURL);
  });
});

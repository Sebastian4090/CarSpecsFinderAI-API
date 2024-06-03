import { Request, Response } from "express";
import handleSpecsPost from "./specs";

jest.mock("openai", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      "Engine Code": "M20B20",
                      Horsepower: "127 HP @ 6000rpm",
                      "Maximum torque": "174 NM @ 4000rpm",
                      Displacement: "2.0 liters (1990 cc)",
                      Configuration: "Inline-6",
                      "Recommended oil": "5W-40 Synthetic",
                      "Fuel Type": "Petrol (Gasoline)",
                      "Fuel System": "Gasoline indirect injection",
                      Aspiration: "Naturally aspirated",
                      "Stock boost pressure": "Not applicable",
                      Bore: "80mm",
                      Stroke: "66mm",
                      "Compression ratio": "9.8",
                      "Valve Train": "Single Overhead Camshaft",
                      "Valves per cylinder": "2",
                      "Engine block material": "Cast iron",
                      "Cylinder head material": "Aluminium",
                    }),
                  },
                },
              ],
            }),
          },
        },
      };
    }),
  };
});

describe("POST /specs", () => {
  it("should return JSON response from OpenAI", async () => {
    const req = {
      body: {
        userPrompt: "Give me engine specifications of BMW E30 (1982-1994) 2.0",
      },
    } as Request;

    const json = jest.fn();
    const res = { json } as unknown as Response;

    await handleSpecsPost(req, res);

    expect(json).toHaveBeenCalledWith(
      JSON.stringify({
        "Engine Code": "M20B20",
        Horsepower: "127 HP @ 6000rpm",
        "Maximum torque": "174 NM @ 4000rpm",
        Displacement: "2.0 liters (1990 cc)",
        Configuration: "Inline-6",
        "Recommended oil": "5W-40 Synthetic",
        "Fuel Type": "Petrol (Gasoline)",
        "Fuel System": "Gasoline indirect injection",
        Aspiration: "Naturally aspirated",
        "Stock boost pressure": "Not applicable",
        Bore: "80mm",
        Stroke: "66mm",
        "Compression ratio": "9.8",
        "Valve Train": "Single Overhead Camshaft",
        "Valves per cylinder": "2",
        "Engine block material": "Cast iron",
        "Cylinder head material": "Aluminium",
      })
    );
  });

  it("should return an error if no userPrompt is provided", async () => {
    const req = { body: {} } as Request;

    const json = jest.fn();
    const status = jest.fn().mockReturnThis();
    const res = { status, json } as unknown as Response;

    await handleSpecsPost(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      status: false,
      error: "Can't post specifications",
    });
  });
});

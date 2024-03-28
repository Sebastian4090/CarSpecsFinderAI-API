import { Request, Response } from "express";
import OpenAI from "openai";
import "../config";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
const OPENAI_MODEL = process.env.OPENAI_MODEL as string;

const systemPrompt: string = `

  Rules:
  - Return data in a json format 
  - Don't generate nested json
  - Don't generate arrays inside json
  - Always return complex data not only the general one 

  User: "Give me engine specifications of BMW E30 (1982-1994) 2.0"
  Assistant:
  Engine Code: M20B20
  Horsepower: 127 HP @ 6000rpm
  Maximum torque: 174 NM @ 4000rpm
  Displacement: 2.0 liters (1990 cc)
  Configuration: Inline-6
  Fuel Type: Petrol (Gasoline)
  Fuel System: gasoline indirect injection
  Aspiration: Naturally aspirated
  Bore: 80mm
  Stroke: 66mm
  Compression ratio: 9.8
  Valve Train: Single Overhead Camshaft
  Valves per cylinder: 2
  Engine block material: Cast iron
  Cylinder head material: Aluminium

  User: "Give me common problems with Volkswagen Golf Fourth generation (1997–2006) 1.6"
  Assistant:
  Electrical problems: This includes issues with various electrical components such as power windows, central locking system, interior lights, and dashboard electronics.
  Engine Oil Leaks: Oil leaks, particularly from the valve cover gasket and camshaft seals.
  Cooling System Faults: Coolant leaks, often from the radiator, water pump, or hoses.
  Exhaust System Rust: Rust can develop in the exhaust system, particularly in regions with harsh climates or road salt usage.
  Interior Trim Wear and Tear: Interior trim components, including door handles, trim panels, and cup holders, may degrade over time
  Electrical Wiring Harness Issues: Wiring harness problems, including damaged or corroded wiring.
`;

const callOpenAI = async (
  userPrompt: string,
  temperature = 0
): Promise<string> => {
  try {
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      max_tokens: 512,
      temperature,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    let content = completion.choices[0]?.message?.content?.trim() ?? "";
    console.log("OpenAI output: \n", content);

    return content;
  } catch (e) {
    console.error("Error getting data", e);
    throw e;
  }
};

const handleSpecsPost = async (req: Request, res: Response) => {
  const { car, userPrompt } = req.body;

  if (!car || !userPrompt) {
    return res.status(400).json({
      status: false,
      error: "Can't post specifications",
    });
  }

  let result;
  try {
    result = await callOpenAI(userPrompt);
  } catch (e: unknown) {
    console.error("Error parsing JSON", e);
  }

  res.json(result);
};

export default handleSpecsPost;

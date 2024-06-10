import http from "http";

const healthcheckUrl = process.env.HEALTHCHECK as string;

const healthCheck = () => {
  http
    .get(healthcheckUrl, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(`Healthcheck response: ${data}`);
      });
    })
    .on("error", (error) => {
      console.error("Error during healthcheck:", error);
    });
};

// 5min
const keepAlive = () => {
  setInterval(healthCheck, 5 * 60 * 1000);
};

export default keepAlive;

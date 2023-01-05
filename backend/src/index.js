import mongo from "./mongo.js";
import httpServer from "./server.js";
import express from "express"
import cors from "cors"
import path from "path"

import "dotenv-defaults/config.js";

mongo.connect();
const port = process.env.PORT | 4000;
const port2 = process.env.PORT | 4001;

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
  }

app.listen(port2, () =>
 console.log(`app listening on port ${port2}!`),
);


httpServer.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});

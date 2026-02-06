import express from "express";
const app = express();
import morgan from "morgan";

const port = 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

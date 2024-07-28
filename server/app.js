import express from "express"
import authRouter from "./routers/authRouter.js";

const app = express();
const port = 9081;
app.use("/api/v1/auth", authRouter);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
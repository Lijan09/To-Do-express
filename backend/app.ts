import { Express } from "express";
const { dbConnect } = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

dbConnect();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import * as dotenv from "dotenv";
dotenv.config();
import Application from "./bootstrap/app";

const port = process.env.PORT || process.env.PORT;

Application.app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
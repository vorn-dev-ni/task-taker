import app from "./app";
import { connectDb } from "./lib/mongdb";

connectDb().then((client) => {
  const server = app.listen(3000, () => {
    console.log("server is running");
  });

  server.on("close", () => {
    console.log("server is close");
  });
});

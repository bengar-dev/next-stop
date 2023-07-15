import express from "express";
import cors from "cors";
import Routes from "@/routes";
import * as dotenv from "dotenv";

dotenv.config();

class App {
  private app: express.Application;
  private routes;

  constructor() {
    this.app = express();
    this.routes = new Routes().router;
    this.init();
    this.start();
  }

  private init(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: [process.env.APP_HOST || "http://localhost:5173"],
        credentials: true,
      })
    );
    this.app.use("/api", this.routes);
  }

  private start(): void {
    this.app.listen(process.env.PORT || "3300", () => {
      console.log("🚀 Server is launching...");
      console.log("🔴 Running on port : " + process.env.PORT || "3300");
    });
  }
}

export default new App();

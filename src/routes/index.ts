import express from "express";
import TamRoutes from "@/routes/tam.routes";

class Routes {
  public router: express.Router;
  private tamRoutes = TamRoutes;

  constructor() {
    this.router = express.Router();
    this.init();
  }

  public init() {
    this.router.use("/tam", this.tamRoutes);
  }
}

export default Routes;

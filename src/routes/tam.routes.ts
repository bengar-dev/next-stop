import TamControllers from "@/controllers/tam";
import express, { Router } from "express";

class TamRoutes {
  public router: Router;
  private tamControllers = new TamControllers();

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    // this.router.get("/", this.tamControllers.getApiDataJson);
    this.router.get("/stops", this.tamControllers.getTamStops);
    this.router.get("/stop", this.tamControllers.getNextStop);
  }
}

export default new TamRoutes().router;

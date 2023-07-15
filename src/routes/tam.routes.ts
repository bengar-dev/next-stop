import TamServices from "@/services/tam";
import express, { Router } from "express";

class TamRoutes {
  public router: Router;
  private tamServices = new TamServices();

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/", async (req, res, next) => {
      /**
       * Todo: in controller
       */
      const test = await this.tamServices.getCSVFileFromTAMApi();
      res.status(200).json(test);
    });
  }
}

export default new TamRoutes().router;

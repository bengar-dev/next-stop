import TamServices from "@/services/tam";
import Controllers from ".";
import { Request, Response } from "express";
import { TamRes } from "@/types/global";

class TamControllers extends Controllers {
  private tamServices = new TamServices();

  constructor() {
    super();
  }

  public getApiDataJson = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const jsonFile = await this.tamServices.getCSVFileFromTAMApi();
      if (!jsonFile) throw new Error("Can not get data from json");

      this.tamServices.writeFile<TamRes[]>("tam.json", jsonFile);

      return this.responseServices.successResponse(res, jsonFile, 200);
    } catch (err: any) {
      return this.responseServices.failResponse(res, err.messages, 500);
    }
  };

  public getTamStops = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const data = await this.tamServices.readCurrentData();

      const allStops = data.map((el) => ({
        stop_code: el.stop_code,
        stop_name: el.stop_name,
        stop_id: el.stop_id,
      }));

      return this.responseServices.successResponse(res, allStops, 500);
    } catch (err: any) {
      return this.responseServices.failResponse(res, err.message, 500);
    }
  };

  public getNextStop = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await this.tamServices.readCurrentData();

      const findStops = data.filter((el) => el.stop_id === id);

      if (!findStops || findStops.length === 0) {
        throw new Error("Stop id not found");
      }

      return this.responseServices.successResponse(res, findStops, 200);
    } catch (err: any) {
      return this.responseServices.failResponse(res, err.message, 500);
    }
  };
}

export default TamControllers;

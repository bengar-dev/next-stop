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

      this.tamServices.fs.writeFile("tam.json", "", () => {
        console.log("clean old data");
        this.tamServices.writeFile<TamRes[]>("tam.json", jsonFile);
      });

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

      const allStops = data
        .map((el) => ({
          route_short_name: el.route_short_name,
          stop_code: el.stop_code,
          stop_name: `L${el.route_short_name} - ${el.stop_name} (Direction : ${
            el.trip_headsign
          } ${
            el.route_short_name === "4"
              ? el.direction_id === "0"
                ? "A"
                : "B"
              : ""
          })`,
          stop_id: el.stop_id,
        }))
        .filter((el) => ["1", "2", "3", "4"].includes(el.route_short_name));

      const uniqStops = this.tamServices.lodash.uniqWith(
        allStops,
        this.tamServices.lodash.isEqual
      );

      const stopsSortByName = this.tamServices.lodash.sortBy(uniqStops, [
        "stop_name",
      ]);

      return this.responseServices.successResponse(res, stopsSortByName, 200);
    } catch (err: any) {
      return this.responseServices.failResponse(res, err.message, 500);
    }
  };

  public getNextStop = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await this.tamServices.readCurrentData();

      const findStops = data
        .filter((el) => el.stop_id === id)
        .map((el) => ({
          ...el,
          delay: this.tamServices.calculateDiffTimeDeparture(el.departure_time),
        }));

      if (!findStops || findStops.length === 0) {
        throw new Error("Stop id not found");
      }

      const clean = this.tamServices.cleanErrorNextStop(findStops);

      return this.responseServices.successResponse(res, clean, 200);
    } catch (err: any) {
      return this.responseServices.failResponse(res, err.message, 500);
    }
  };
}

export default TamControllers;

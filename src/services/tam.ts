import Services from "@/services/index";
import { NextDepartureInfo, TamRes, TamResFormatData } from "@/types/global";
import { set, differenceInMinutes, addDays } from "date-fns";

class TamServices extends Services {
  constructor() {
    super();
  }

  public getCSVFileFromTAMApi = async (): Promise<TamRes[] | undefined> => {
    const file = await this.downloadFile(process.env.CSV_DOWNLOAD_TAM);
    if (!file?.filePath) return;

    const jsonFile = await this.convertCsvFileToJson(file.filePath);

    return jsonFile;
  };

  public readCurrentData = async (): Promise<TamRes[]> => {
    return [] as TamRes[];
  };

  public calculateDiffTimeDeparture = (
    departureTime: string
  ): NextDepartureInfo => {
    const currentTime = new Date();
    const [hours, minutes, seconds] = departureTime.split(":").map(Number);

    let nextDepartureDate = set(currentTime, { hours, minutes, seconds });

    if (nextDepartureDate < currentTime) {
      nextDepartureDate = addDays(nextDepartureDate, 1);
    }

    const minutesDifference = differenceInMinutes(
      nextDepartureDate,
      currentTime
    );

    return {
      departureTime: nextDepartureDate,
      timeRemainingInMinutes: minutesDifference,
    };
  };

  public cleanErrorNextStop = (
    data: TamResFormatData[],
    direction: string
  ): TamResFormatData[] => {
    const newCleanArrayData: TamResFormatData[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i + 1]) {
        if (
          data[i].delay.timeRemainingInMinutes >
          data[i + 1].delay.timeRemainingInMinutes
        ) {
          continue;
        } else {
          newCleanArrayData.push(data[i]);
        }
      } else {
        newCleanArrayData.push(data[i]);
      }
    }

    return newCleanArrayData.filter((el) => el.direction_id === direction);
  };

  private convertCsvFileToJson = async (path: string): Promise<TamRes[]> => {
    const csvPath = path;

    return this.csv.getJsonFromCsv(csvPath);
  };
}

export default TamServices;

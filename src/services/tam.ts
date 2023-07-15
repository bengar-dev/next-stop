import Services from "@/services/index";
import { TamRes } from "@/types/global";

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

  public convertCsvFileToJson = async (path: string): Promise<TamRes[]> => {
    const csvPath = path;

    return this.csv.getJsonFromCsv(csvPath);
  };
}

export default TamServices;

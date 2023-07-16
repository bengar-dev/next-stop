import axios, { Axios } from "axios";
import fs from "fs";
import Downloader from "nodejs-file-downloader";
//@ts-ignore
import csvToJson from "convert-csv-to-json";

class Services {
  public axios: Axios;
  public fs: typeof fs;
  public downloader: Downloader;
  public csv: typeof csvToJson;

  constructor() {
    this.axios = axios;
    this.fs = fs;
    this.csv = csvToJson;
  }

  public downloadFile = async (
    url?: string
  ): Promise<{ filePath: string | null; downloadStatus: string } | null> => {
    if (!url) return null;

    const down = new Downloader({
      url,
      directory: "./downloads",
      cloneFiles: false,
    });

    try {
      const { filePath, downloadStatus } = await down.download();
      return {
        filePath,
        downloadStatus,
      };
    } catch (err: any) {
      console.log("Download failed", err);
      return null;
    }
  };

  public writeFile = async <T>(target: string, data: T): Promise<boolean> => {
    const dataToString = JSON.stringify(data);

    this.fs.writeFile(target, dataToString, "utf-8", (err) => {
      if (err) throw err;
    });

    return true;
  };
}

export default Services;

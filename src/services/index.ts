import axios, { Axios } from "axios";
import fs from "fs";
import http from "http";
import Downloader from "nodejs-file-downloader";
//@ts-ignore
import csvToJson from "convert-csv-to-json";

class Services {
  public axios: Axios;
  public fs: typeof fs;
  public http: typeof http;
  public downloader: Downloader;
  public csv: typeof csvToJson;

  constructor() {
    this.axios = axios;
    this.fs = fs;
    this.http = http;
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
}

export default Services;

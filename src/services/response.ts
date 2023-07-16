import { Response } from "express";
import Services from ".";

class ResponseServices extends Services {
  constructor() {
    super();
  }

  public successResponse = async <T>(
    res: Response,
    data: T,
    code: number = 200
  ) => {
    return res.status(code).json({ sucess: true, data });
  };

  public failResponse = async (
    res: Response,
    message: string,
    code: number = 500
  ) => {
    return res.status(code).json({ success: false, message });
  };
}

export default ResponseServices;

import { Request, NextFunction, Response } from "express";
import Middleware from ".";
import * as jwt from "jsonwebtoken";

class AuthMiddleware extends Middleware {
  private jwt = jwt;

  constructor() {
    super();
  }

  public checkAppToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jwtToken = req.headers.authorization?.split(" ")[1];
      if (!jwtToken) {
        throw new Error("Token doesn't exist");
      }

      const jwtDecodedToken = this.jwt.verify(
        jwtToken,
        process.env.TOKEN_KEY || "tokenKey"
      );

      if (!jwtDecodedToken) {
        throw new Error("Can not decoded token");
      }

      next();
    } catch (err: any) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  };
}

export default AuthMiddleware;

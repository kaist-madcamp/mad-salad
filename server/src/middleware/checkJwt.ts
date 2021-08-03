import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["authorization"];
  let jwtPayload;
  try {
    console.log(process.env.SECRET_KEY!);
    jwtPayload = <any>jwt.verify(token, "asdasdsaxzcqwkn12kmlasm");
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(200).json({
      ok: false,
      error: "invalid token",
    });
    return;
  }
  next();
};

import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["authorization"];
  let jwtPayload;
  //console.log(token)
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(200).json({
      ok: false,
      error: "invalid token"
    });
    return;
  }
/*
  const {userId} = req.params
  const  userIdJwt = jwtPayload.userId;
  console.log(userId);console.log(userIdJwt);
  if( userId &&(userId!=userIdJwt)){
    res.json({
      ok:false,
      error: "userId in params and jwt differs"
    })
  }else{
    
  }*/
  next();
  //The token is valid for 1 hour
  //We want to send a new token on every request
  /*const { userId } = jwtPayload;
  const newToken = jwt.sign({ userId}, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader(
    "token", newToken);*/

};
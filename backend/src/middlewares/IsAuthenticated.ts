import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

interface Payload{
  sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  //receber o token
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).end();
  }

  const [, token] = authToken.split(' ');

  console.log(token);

  try {
    //Validar token
    const { sub } = verify(
      token, process.env.JWT_SECRET
    ) as Payload;

      //RECUPERAR O ID DO TOKEN E COLOCAR DENTRO DE UMA VARIAVEL DENTRO DO USER_ID DENTRO DO REQ
      req.user_id = sub;

      return next();
      
  } catch (error) {
    return res.status(401).end();
  }
}
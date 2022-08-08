import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
class CorsMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  }
}

export default CorsMiddleWare;

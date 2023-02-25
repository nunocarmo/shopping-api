import { Request, Response, NextFunction } from 'express';

type verifyTokenFnType = (req: Request, res: Response, next: NextFunction) => Response<unknown, Record<string, unknown>> | undefined;

export { verifyTokenFnType };
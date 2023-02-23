import { Request, Response } from "express";

type verifyTokenFnType = (req: Request, res: Response, next: any) => Response<any, Record<string, any>> | undefined;

export { verifyTokenFnType }
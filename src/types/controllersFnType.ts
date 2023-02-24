import { Request, Response } from "express";

type controllersFnType = (req: Request, res: Response) => void | Promise<Response<any>>;

export { controllersFnType }
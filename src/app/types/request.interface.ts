import { Request } from "express";

export interface NewRequestInterface extends Request { user?: any }
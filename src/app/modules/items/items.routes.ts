import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import itemsService from "./items.service";
import { ResponseHandler } from "../../utils/response.handler";

const router = Router();

// Public route
router.get("/items", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await itemsService.getAll()
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
});


export default new Route('/items', router);

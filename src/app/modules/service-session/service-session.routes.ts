import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";


import { validateRequestBody } from "../../utils/get-model-schema.util";
import { SaleHeaders } from "../sale-items/entities/sale-header.entity";
import saleHeaderService from "../sale-items/sale-header.service";
const router = Router();

router.post(
  "/",
  validateRequestBody(SaleHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await saleHeaderService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateRequestBody(SaleHeaders),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await saleHeaderService.updateById(id, req.body);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("/service-sessions", router);

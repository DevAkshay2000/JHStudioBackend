import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";

import { validateBodyManual } from "../../utils/validate-req-body.util";
import { SaleHeadersSchema } from "../../schema/sale-header.schema";
import serviceSessionService from "./service-session.service";
const router = Router();

router.post(
  "/",
  validateBodyManual(SaleHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await serviceSessionService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/:id",
  validateBodyManual(SaleHeadersSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await serviceSessionService.updateById(id, req.body);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("/service-sessions", router);

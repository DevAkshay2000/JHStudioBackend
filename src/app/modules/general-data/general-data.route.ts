import { Request, Response, Router } from "express";
import { routeToEntityMap } from "./mappings/modeltoroutemapping.mapping";
import { handler } from "../../config/dbconfig";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { Route } from "../../routes/routes.types";
import { Menus } from "./entities";
import authenticateToken from "../../middlewares/authenticate.middleware";
import { AuthenticatedRequest } from "../../types";
const router = Router();
for (let [key, value] of Object.entries(routeToEntityMap)) {
  router.get(
    key,
    validateFilter(value),
    async (req: Request, res: Response) => {
      try {
        const appDataSource = await handler();
        const repository = appDataSource.getRepository(value);
        const data = await repository.find(await getQuery(req, value));
        res.status(200).json(data);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching DescriptionType", error });
      }
    }
  );
}
router.get("/menu-headers", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    //take user related data only 
    const user: any = req.user
    if (user) {
      const appDataSource = await handler();
      const repository = appDataSource.getRepository(Menus);
      const data = await repository.find({
        relations: {
          features: true,
        },
      });
      const respo: {
        title: string;
        url: string;
        icon: string;
        subItems: { title: string; url: string }[];
      }[] = [];
      for (let menu of data) {
        let level1: { title: string; url: string }[] = [];
        for (let feature of menu.features) {
          //1.send all menus for admin
          if (user.userType.id === 1) {
            level1.push({
              title: feature.displayName,
              url: feature.route,
            });

          }
          //2.restrict menus for normal user
          if (!feature.isAdminMenu && user.userType.id != 1) {
            level1.push({
              title: feature.displayName,
              url: feature.route,
            });
          }
        }
        level1.length && respo.push({
          title: menu.name,
          url: "#",
          icon: menu.icon,
          subItems: level1,
        });
      }
      res.status(200).json(respo);
    }
    else {
      throw {
        message: "No metadata found for given user..",
        statusCode: 404,
      };
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching menus", error });
  }
});
export default new Route("", router);

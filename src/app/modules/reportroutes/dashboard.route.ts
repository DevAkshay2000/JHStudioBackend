import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { handler } from "../../config/dbconfig";
import { Users } from "../auth/entities/user.entity";
import { SaleHeaders } from "../sale-items/entities/sale-header.entity";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result: {
      topArtist: any[];
      topItems: any[];
      topService: any[];
    } = {
      topArtist: [],
      topItems: [],
      topService: [],
    };
    const now = new Date();
    const colorArrayArtist = [
      "#0D4F8B",
      "#1D88EA",
      "#82BEF3",
      "#E8F3FD",
      "#F6EFEF",
    ];
    const colorArrayItem = [
      "#9E0508	",
      "#F8171B",
      "#FB7E81",
      "#E8F3FD",
      "#FEE6E7",
      "#F6EFEF",
    ];
    const colorArrayService = [
      "#6B8E23	",
      "#A4D146",
      "#CCE698",
      "#F5FAEB",
      "#F6EFEF",
    ];
    //get start date of current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const dataSource = await handler();
    const dashboards = await dataSource
      .getRepository(SaleHeaders)
      .createQueryBuilder("sale")
      .leftJoinAndSelect("sale.user", "user")
      .select([
        //   "sale.id",
        "user.name as artist",
        "COUNT(user.id) as count",
      ])
      .where("sale.txnDate BETWEEN :start AND :end", {
        start: startOfMonth,
        end: now,
      })
      .groupBy("user.id")
      .orderBy("count","DESC")
      .limit(5)
      // .addGroupBy("sale.id")
      // .addGroupBy("user.name")
      .getRawMany(); // Use getRawMany for raw results

    result.topArtist = dashboards.map((val: any, index) => {
      return {
        artist: val.artist,
        count: Number(val.count),
        fill: colorArrayArtist[index],
      };
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

export default new Route("/dashboards", router);

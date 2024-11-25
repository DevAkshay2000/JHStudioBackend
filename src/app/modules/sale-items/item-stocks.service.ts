import { In } from "typeorm";
import { handler } from "../../config/dbconfig";
import { InventoryLines } from "./entities/inventory-lines.entity";
import { ItemStocks } from "./entities/item-stocks.entity";
import { SaleHeaders } from "./entities/sale-header.entity";
import { SaleLines } from "./entities/sale-lines.enity";

//3. create single record
const create = async (
  inventory: InventoryLines[],
  itemIds: number[]
): Promise<Omit<ItemStocks, "id">[]> => {
  try {
    const dataSource = await handler();
    const itemStocksRepo = dataSource.getRepository(ItemStocks);

    const resultItemStock: Omit<ItemStocks, "id">[] = [];
    //update inventory stocks
    const itemStocks = await itemStocksRepo.find({
      where: {
        service: {
          id: In(itemIds),
        },
      },
      relations: {
        service: true,
      },
    });

    inventory.forEach((element) => {
      //check if element item present in stock
      const foundStockRecord = itemStocks.find(
        (data) => data.service.id === element.service.id
      );
      //if present then update the stock to new stock increament
      if (foundStockRecord) {
        resultItemStock.push({
          ...foundStockRecord,
          quantity: Number(foundStockRecord.quantity + element.quantity),
        });
      }
      // if not then add new record in itemStocks and assign vlue
      else {
        resultItemStock.push({
          quantity: element.quantity,
          modifiedDate: element.modifiedDate,
          service: element.service,
        });
      }
    });
    return resultItemStock;
  } catch (error) {
    throw error;
  }
};
export default { create };
import { FindManyOptions, FindOneOptions, In } from "typeorm";

import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import { SaleHeaders } from "./entities/sale-header.entity";
import repository from "./sale-header.repo";
import { InventoryLines } from "./entities/inventory-lines.entity";
import invoiceMailer from "../../services/send-invoice-mail.service";
import customerService from "../customer/customer.service";
import { ItemStocks } from "./entities/item-stocks.entity";
import itemStocksService from "./item-stocks.service";

//1. find multiple records
const find = async (filter?: FindManyOptions<SaleHeaders>) => {
  try {
    console.log("inside thus 3")
    const repo = await repository();
    return repo.find(filter);
  } catch (error) {
    throw error;
  }
};
//2. find single records
const findById = async (
  id: number,
  filter?: FindOneOptions<SaleHeaders> | FindManyOptions<SaleHeaders>
) => {
  try {
    const repo = await repository();
    const respo = await repo.findOneById(id, filter);
    return respo;
  } catch (error) {
    throw error;
  }
};

//3. create single record
const create = async (data: SaleHeaders, isService: boolean = false) => {
  try {
    const repo = await repository();
    const dataSource = await handler();
    const itemStocksRepo = dataSource.getRepository(ItemStocks);
    data = await generateCode(19, data);
    const inventory: InventoryLines[] = [];
    const itemIds: number[] = [];
    const invoiceItems: {
      name: string;
      quantity: number;
      unitPrice: number;
      total: number;
      tax: number;
      taxName: string;
    }[] = [];
    if (!isService) {
      data.saleLines.forEach((value) => {
        const il = new InventoryLines();
        (il.service = value.service),
          (il.quantity = value.quantity),
          (il.createdDate = value.createdDate),
          (il.modifiedDate = value.modifiedDate);
        inventory.push(il);
        itemIds.push(value.service.id);
        invoiceItems.push({
          name: value.service.name,
          quantity: value.quantity,
          unitPrice: value.rate,
          total: Number(value.amount + value.taxAmount),
          tax: value.taxAmount,
          taxName: value.tax.name,
        });
      });
      data.inventoryLines = inventory;
      // create stock elements
      const resultItemStock = await itemStocksService.create(inventory, itemIds);
      const itemStockResponse = itemStocksRepo.create(resultItemStock);
      await itemStocksRepo.save(itemStockResponse);
    }

    const respo = await repo.create({
      ...data,
    });
    //get customer data custo
    const customer = await customerService.findById(data.customer.id);

    await invoiceMailer({
      customer: customer.name,
      txnDate: new Date(data.txnDate).toLocaleDateString(),
      txnId: data.code,
      mobile: customer.mobile,
      subTotal: data.totalAmount,
      tax: data.totalTax,
      discount: data.totalDiscount,
      email: customer.email,
      itemData: invoiceItems,
    });
    return respo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//4. update single record by id
const updateById = async (
  id: number,
  data: SaleHeaders,
  isService: boolean = false
) => {
  try {
    const repo = await repository();
    data = await generateCode(19, data);
    const inventory: InventoryLines[] = [];
    if (!isService) {
      data.saleLines.forEach((value) => {
        const il = new InventoryLines();
        (il.service = value.service),
          (il.quantity = value.quantity),
          (il.createdDate = value.createdDate),
          (il.modifiedDate = value.modifiedDate);
        inventory.push(il);
      });
      data.inventoryLines = inventory;
    }
    const respo = await repo.updateById(id, {
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//5. delete single record by id
const deleteById = async (id: number) => {
  try {
    const repo = await repository();
    await repo.deleteById(id);
  } catch (error) {
    throw error;
  }
};

export default { find, findById, create, deleteById, updateById };

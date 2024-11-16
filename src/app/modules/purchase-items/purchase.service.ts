import { FindManyOptions, FindOneOptions } from "typeorm";

import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import repository from "./purchase.repo";
import { PurchaseHeaders } from "./entities/purchase-headers.entity";
import { InventoryLines } from "../sale-items/entities/inventory-lines.entity";

//1. find multiple records
const find = async (filter?: FindManyOptions<PurchaseHeaders>) => {
  try {
    const repo = await repository();
    return repo.find(filter);
  } catch (error) {
    throw error;
  }
};
//2. find single records
const findById = async (
  id: number,
  filter?: FindOneOptions<PurchaseHeaders> | FindManyOptions<PurchaseHeaders>
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
const create = async (data: PurchaseHeaders, isService: boolean = false) => {
  try {
    const repo = await repository();
    data = await generateCode(20, data);
    const inventory: InventoryLines[] = [];
    if (!isService) {
      data.purchaseLines.forEach((value) => {
        const il = new InventoryLines();
        (il.service = value.service),
          (il.quantity = -Number(value.quantity)),
          (il.createdDate = value.createdDate),
          (il.modifiedDate = value.modifiedDate);
        inventory.push(il);
      });
      data.inventoryLines = inventory;
    }
    const respo = repo.create({
      ...data,
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (
  id: number,
  data: PurchaseHeaders,
  isService: boolean = false
) => {
  try {
    const repo = await repository();
    data = await generateCode(20, data);
    const inventory: InventoryLines[] = [];
    if (!isService) {
      data.purchaseLines.forEach((value) => {
        const il = new InventoryLines();
        (il.service = value.service),
          (il.quantity = -Number(value.quantity)),
          (il.createdDate = value.createdDate),
          (il.modifiedDate = value.modifiedDate);
        inventory.push(il);
      });
      data.inventoryLines = inventory;
    }
    const respo = repo.updateById(id, {
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

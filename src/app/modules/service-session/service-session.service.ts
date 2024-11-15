import { FindManyOptions, FindOneOptions } from "typeorm";

import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import { SaleHeaders } from "../sale-items/entities/sale-header.entity";

//3. create single record
const create = async (data: SaleHeaders) => {
  try {
    //use sale service here 
    return {};
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: SaleHeaders) => {
  try {
    //user sale service here
    return {};
  } catch (error) {
    throw error;
  }
};

export default { create, updateById };

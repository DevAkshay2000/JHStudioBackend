import { SaleHeaders } from "../sale-items/entities/sale-header.entity";

import saleHeaderService from "../sale-items/sale-header.service";
//3. create single record
const create = async (data: SaleHeaders) => {
  try {
    const respo = await saleHeaderService.create(data, true);
    //use sale service here
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: SaleHeaders) => {
  try {
    const respo = await saleHeaderService.updateById(id, data);
    return respo;
  } catch (error) {
    throw error;
  }
};

export default { create, updateById };

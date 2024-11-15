import { FindManyOptions, FindOneOptions } from "typeorm";


import { generateCode } from "../../utils/get-object-code.util";
import { handler } from "../../config/dbconfig";
import { City, Country, States } from "../general-data/entities";
import { SaleHeaders } from "./entities/sale-header.entity";
import repository from "./sale-header.repo";


//1. find multiple records
const find = async (filter?: FindManyOptions<SaleHeaders>) => {
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
const create = async (data: SaleHeaders) => {
  try {
    const repo = await repository();
    data = await generateCode(14, data);
    const respo = repo.create({
      ...data
    });
    return respo;
  } catch (error) {
    throw error;
  }
};

//4. update single record by id
const updateById = async (id: number, data: SaleHeaders) => {
  try {
    
    const repo = await repository();
    data = await generateCode(14, data);
    const respo = repo.updateById(id, {
      ...data
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

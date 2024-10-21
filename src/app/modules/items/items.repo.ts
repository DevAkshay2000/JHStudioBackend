import { FindManyOptions, FindOneOptions } from "typeorm";
import { dataSource } from "../../app";
import { Item } from "./entities/items.entity";

const itemRepository = dataSource.getRepository(Item);

// define basic methods here
const find = (option: FindManyOptions<Item>) => itemRepository.find(option);
const findOne = (option: FindOneOptions<Item>) => itemRepository.findOne(option);


export default {
    find,
    findOne,
}
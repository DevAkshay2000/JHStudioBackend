// src/controllers/userController.ts
import { Request, Response } from "express";

import { Item, ItemDescription, ItemImage } from "../entities";
import { handler } from "../config/dbconfig";

const find = async (req: Request, res: Response) => {
  try {
    const appDataSource = await handler();
    const itemRepository = await appDataSource.getRepository(Item);
    // Fetch all users from the database (example logic)
    const users = await itemRepository.find({
      relations: {
        itemImage: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching items", error });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const appDataSource = await handler();
    const itemRepository = appDataSource.getRepository(Item);
    const item = await itemRepository.findOne({
      where: {
        id: Number(req.params.id),
      },
      relations: {
        itemDescription: true,
        itemImage: true,
      },
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const appDataSource = await handler();
    const data: {
      item: Item;
      itemDescriptions: ItemDescription[];
      itemImages: ItemImage[];
    } = req.body;
    const itemRepository = appDataSource.getRepository(Item);
    const item = itemRepository.create(data.item);
    await itemRepository.save(item);
    // await appDataSource.transaction(async (transactionEntityManager) => {
    //     const item = await transactionEntityManager.save(Item, data.item);
    //     console.log(item)
    //     if (data.itemDescriptions && data.itemDescriptions.length) {
    //         const itemDescription = data.itemDescriptions.map((val) => {
    //             return {
    //                 ...val,
    //                 itemId: item.id
    //             }
    //         })
    //         transactionEntityManager.save(ItemDescription, itemDescription)

    //     }
    //     if (data.itemImages && data.itemImages.length) {
    //         const itemImages = data.itemImages.map((val) => {
    //             return {
    //                 ...val,
    //                 itemId: item.id
    //             }
    //         })
    //         transactionEntityManager.save(ItemImage, itemImages)
    //     }

    // });

    return res.status(201).json("item created ...");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error creating user", error });
  }
};

const updateById = async (req: Request, res: Response) => {
  try {
    const appDataSource = await handler();
    const itemRepository = appDataSource.getRepository(Item);
    const item = await itemRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const updatedItem = itemRepository.merge(item, req.body);
    await itemRepository.save(updatedItem);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};
const deleteById = async (req: Request, res: Response) => {
  try {
    const appDataSource = await handler();
    const itemRepository = appDataSource.getRepository(Item);
    const item = await itemRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await itemRepository.remove(item);
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};
export default { find, findById, create, deleteById, updateById };

// src/controllers/userController.ts
import { Request, Response } from "express";
import { appDataSource } from "../config/dbconfig";
import { ItemImage } from "../entities";

const find = async (req: Request, res: Response) => {
    try {
        const itemImagesRepository = appDataSource.getRepository(ItemImage);
        // Fetch all users from the database (example logic)
        const itemImage = await itemImagesRepository.find();
        res.status(200).json(itemImage);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

const findById = async (req: Request, res: Response) => {
    try {
        const itemImagesRepository = appDataSource.getRepository(ItemImage);
        const itemImage = await itemImagesRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (!itemImage) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(itemImage);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const itemImagesRepository = appDataSource.getRepository(ItemImage);
        const itemImage = itemImagesRepository.create(req.body);
        await itemImagesRepository.save(itemImage);
        res.status(201).json(itemImage);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

const updateById = async (req: Request, res: Response) => {
    try {
        const itemImagesRepository = appDataSource.getRepository(ItemImage);
        const itemImage = await itemImagesRepository.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!itemImage) {
            return res.status(404).json({ message: "Item not found" });
        }
        const updatedItem = itemImagesRepository.merge(itemImage, req.body);
        await itemImagesRepository.save(updatedItem);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error });
    }
};
const deleteById = async (req: Request, res: Response) => {
    try {
        const itemImagesRepository = appDataSource.getRepository(ItemImage);
        const itemImage = await itemImagesRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!itemImage) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await itemImagesRepository.remove(itemImage);
        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item', error });
    }
};
export default { find, findById, create, deleteById, updateById }
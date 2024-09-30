// src/controllers/userController.ts
import { Request, Response } from "express";
import { ItemDescription } from "../entities";
import { handler } from "../config/dbconfig";

const find = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const itemDescriptionRepository = appDataSource.getRepository(ItemDescription);
        // Fetch all users from the database (example logic)
        const itemDescription = await itemDescriptionRepository.find();
        res.status(200).json(itemDescription);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

const findById = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const itemDescriptionRepository = appDataSource.getRepository(ItemDescription);
        const itemDescription = await itemDescriptionRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (!itemDescription) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(itemDescription);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const itemDescriptionRepository = appDataSource.getRepository(ItemDescription);
        const itemDescription = itemDescriptionRepository.create(req.body);
        await itemDescriptionRepository.save(itemDescription);
        res.status(201).json(itemDescription);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

const updateById = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const itemDescriptionRepository = appDataSource.getRepository(ItemDescription);
        const itemDescription = await itemDescriptionRepository.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!itemDescription) {
            return res.status(404).json({ message: "Item not found" });
        }
        const updatedItem = itemDescriptionRepository.merge(itemDescription, req.body);
        await itemDescriptionRepository.save(updatedItem);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error });
    }
};
const deleteById = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const itemDescriptionRepository = appDataSource.getRepository(ItemDescription);
        const itemDescription = await itemDescriptionRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!itemDescription) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await itemDescriptionRepository.remove(itemDescription);
        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item', error });
    }
};
export default { find, findById, create, deleteById, updateById }
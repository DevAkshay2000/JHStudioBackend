// src/controllers/userController.ts
import { Request, Response } from "express";
import { DescriptionType } from "../entities";
import { handler } from "../config/dbconfig";

const find = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const descriptionTypeRepository = appDataSource.getRepository(DescriptionType);
        // Fetch all users from the database (example logic)
        const descriptionType = await descriptionTypeRepository.find();
        res.status(200).json(descriptionType);
    } catch (error) {
        res.status(500).json({ message: "Error fetching DescriptionType", error });
    }
};

const findById = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const descriptionTypeRepository = appDataSource.getRepository(DescriptionType);
        const descriptionType = await descriptionTypeRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (!descriptionType) {
            return res.status(404).json({ message: "DescriptionType not found" });
        }
        res.status(200).json(descriptionType);
    } catch (error) {
        res.status(500).json({ message: "Error fetching DescriptionType", error });
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const descriptionTypeRepository = appDataSource.getRepository(DescriptionType);
        const descriptionType = descriptionTypeRepository.create(req.body);
        await descriptionTypeRepository.save(descriptionType);
        res.status(201).json(descriptionType);
    } catch (error) {
        res.status(500).json({ message: "Error creating DescriptionType", error });
    }
};

const updateById = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const descriptionTypeRepository = appDataSource.getRepository(DescriptionType);
        const descriptionType = await descriptionTypeRepository.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!descriptionType) {
            return res.status(404).json({ message: "DescriptionType not found" });
        }
        const updatedItem = descriptionTypeRepository.merge(descriptionType, req.body);
        await descriptionTypeRepository.save(updatedItem);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating DescriptionType", error });
    }
};
const deleteById = async (req: Request, res: Response) => {
    try {
        const appDataSource = await handler()
        const descriptionTypeRepository = appDataSource.getRepository(DescriptionType);
        const descriptionType = await descriptionTypeRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!descriptionType) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await descriptionTypeRepository.remove(descriptionType);
        res.status(200).json({ message: 'DescriptionType removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing DescriptionType', error });
    }
};
export default { find, findById, create, deleteById, updateById }
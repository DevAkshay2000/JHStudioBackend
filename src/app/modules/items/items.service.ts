import itemsRepo from "./items.repo";

const getAll = async () => {
    try {
        return itemsRepo.find({
            relations: {
                itemImage: true,
                itemDescription: true
            }
        });
    } catch (error) {
        console.log(error);
        throw ({ message: "Error fetching items", statusCode: 400 });
    }
};


export default {
    getAll
};

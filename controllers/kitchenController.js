const Kitchen = require("../models/Kitchen");

const createKitchen = async (req, res) => {
    try {
        const newKitchen = await Kitchen.create(req.body);
        
        res.status(201).json({
            message: "Success! Kitchen added to the list.",
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to add kitchen"});
    }
};


const getAllKitchens = async (req, res) => {
    try {
       
        const kitchens = await Kitchen.find({ isAvailable: true });
        
        res.status(200).json(kitchens);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getKitchenDetails = async (req, res) => {
    try {
       
        const kitchen = await Kitchen.findById(req.params.id).populate('owner', 'name email');
        
        if (!kitchen) {
            return res.status(404).json({ message: "Sorry, this kitchen doesn't exist." });
        }

        res.status(200).json(kitchen);
    } catch (error) {
        res.status(500).json({ message: "Error fetching details", error: error.message });
    }
};

module.exports = {
    createKitchen,
    getAllKitchens,
    getKitchenDetails
};
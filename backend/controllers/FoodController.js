import foodModel from "../models/foodModel.js";
import fs, { unlink } from 'fs'

//add food item
 

const addFood = async (req, res) => {
    try {
        // console.log(req.file.filename);
        // console.log(req.body.name);
        // console.log(req.body.price);
        // console.log(req.body.description);
        // console.log(req.body.category);

        let image_filename = `${req.file.filename}`;
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });

        await food.save();
        res.status(200).json({ success: true, message: 'Food added' });
    } catch (error) {
        console.error('Error adding food:', error);
        res.status(500).json({ success: false, message: 'Error adding food' });
    }
};

//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        // console.log(foods)
        res.json({ success: true, data: foods });

    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Err' });

    }

}
//remove food 
const removeFood = async (req, res) => {
    try {
        
        // console.log(req.params.id)
        const food = await foodModel.findById(req.params.id);
        // console.log(food)
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Food Removed" })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: "Err" })

    }
}
 
export { addFood, listFood, removeFood }
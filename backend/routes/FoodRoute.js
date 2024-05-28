import express from 'express';
import foodModel from '../models/foodModel.js';
import multer from 'multer';
import { addFood, getItem, listFood, rating, removeFood } from '../controllers/FoodController.js';

const foodRouter = express.Router();

//image storage engine

const storage = multer.diskStorage(({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
}))
const upload = multer({storage:storage})
//now we will use upload.single to use above middleware in our route


foodRouter.post('/add',upload.single('image'),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove/:id',removeFood)
foodRouter.get('/get/:id',getItem)
foodRouter.post('/rating',rating)


export default foodRouter
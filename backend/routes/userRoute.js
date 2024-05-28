import express from 'express';
import { addWish, getWishList, loginAdmin, loginUser, registerUser, removeWish } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';
const userRouter = express.Router();


userRouter.post('/login',loginUser);
userRouter.post('/register',registerUser);
userRouter.post('/admin',loginAdmin);
userRouter.post('/addwish',authMiddleware,addWish);
userRouter.get('/getwish',authMiddleware,getWishList);
userRouter.post('/removewish/:id',authMiddleware,removeWish);
 

export default userRouter;
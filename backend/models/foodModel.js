import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    ratingSum: {
        type: Number,
        default: 0
    },
    actRating: {
        type: Number,
        default: 0
    },
    nUserRated: {
        type: Array,
        default: []

    },
    desc: {
        type: Array,
        default: []
    },
    title: {
        type: Array,
        default: []
    }
})
const foodModel = mongoose.model.food || mongoose.model("food", foodSchema);
export default foodModel;
import mongoose from 'mongoose'

let filmSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    avatar: { type: String, required: true },
    gallery: { type: Array, default: [], required: true },
    rating: { type: Number, min: 1, max: 5 },
    category: String
})
 
let Films = mongoose.model('Film', filmSchema);

export default Films
import mongoose from 'mongoose'

let categorySchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    films: { type: Array, default: [], required: true }
})
 
let Category = mongoose.model('Film_Categories', categorySchema);

export default Category
import mongoose from 'mongoose';

const productosCollection = 'productos';

const ProductoSchema = new mongoose.Schema({
    title: {type: String, require: true, max: 100},
    precio: {type: Number, require: true},
    thumbnail: {type: String, require: true, max: 300}
}) 

export const productos = mongoose.model(productosCollection, ProductoSchema);
import mongoose from "mongoose";
const productCollection="products"
const productSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: false // Ahora el campo no es requerido
    },
    code: {
        type: String,
        unique: true, // Se asegura que el código sea único
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true // Establecemos el valor por defecto en true
    }
})

export const productsModel= mongoose.model(productCollection,productSchema)

// import mongoose from "mongoose";
// const productCollection="products"
// const productSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   code: String,
//   price: Number,
//   status: Boolean,
//   stock: Number,
//   category: String,
//   thumbnail: String,
// });

// export const productsModel = mongoose.model("productsCollection", productSchema);

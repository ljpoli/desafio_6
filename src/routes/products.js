 import express from "express";
 import ProductManager from "../dao/mongomanagers/productManagerMongo.js";

 const productsRouter = express.Router();
 const PM = new ProductManager(); 

 // Ruta para obtener todos los productos
 productsRouter.get("/", async (req, res) => {
   try {
     const products = await PM.getProduct();
     console.log(products); // Agrega este console.log
     res.render("home", { products, title: "Home" });
   } catch (error) {
     console.error('Error al obtener los productos:', error);
     res.status(500).json({ error: "Error al obtener los productos" });
   }
 });


 // Ruta para obtener un producto específico por ID
 productsRouter.get("/:id", async (req, res) => {
   try {
     const productId = req.params.id;
     const product = await PM.getProductById(productId);

     if (!product) {
       return res.status(404).json({ error: "Producto no encontrado" });
     }

     res.json(product);
   } catch (error) {
     res.status(500).json({ error: "Error al obtener el producto" });
   }
 });

 // Ruta para agregar un nuevo producto
 productsRouter.post("/", async (req, res) => {
   try {
     const newProduct = req.body; // Asegúrate de enviar los datos del producto en el cuerpo de la solicitud (POST request)
     const product = await PM.addProduct(newProduct);
     res.status(201).json(product);
   } catch (error) {
     res.status(500).json({ error: "Error al agregar el producto" });
   }
 });

 // Ruta para actualizar un producto por ID
 productsRouter.put("/:id", async (req, res) => {
   try {
     const productId = req.params.id;
     const updatedProduct = req.body; // Asegúrate de enviar los datos del producto actualizado en el cuerpo de la solicitud (PUT request)
     const product = await PM.updateProduct(productId, updatedProduct);

     if (!product) {
       return res.status(404).json({ error: "Producto no encontrado" });
     }

     res.json(product);
   } catch (error) {
     res.status(500).json({ error: "Error al actualizar el producto" });
   }
 });

 // Ruta para eliminar un producto por ID
 productsRouter.delete("/:id", async (req, res) => {
   try {
     const productId = req.params.id;
     const deletedProduct = await PM.deleteProduct(productId);

     if (!deletedProduct) {
       return res.status(404).json({ error: "Producto no encontrado" });
     }

     res.json(deletedProduct);
   } catch (error) {
     res.status(500).json({ error: "Error al eliminar el producto" });
   }
 });

 export default productsRouter;

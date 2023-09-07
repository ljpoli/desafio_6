 import express from "express";
 import CartManager from "../dao/mongomanagers/cartManagerMongo.js";

 const cartsRouter = express.Router();
 const CM = new CartManager("./src/dao/filemanager/data/products.json");

 // Agregar un carrito nuevo
 cartsRouter.post("/", async (req, res) => {
   try {
     await CM.addCart();
     res.status(201).json({ message: "Carrito creado exitosamente" });
   } catch (error) {
     res.status(500).json({ error: "Error al crear el carrito" });
   }
 });

 // Agregar un producto a un carrito
 cartsRouter.post("/:cid/products/:pid", async (req, res) => {
   try {
     const cid = parseInt(req.params.cid);
     const pid = parseInt(req.params.pid);
     const result = await CM.addProductToCart(cid, pid);
     if (result) {
       res.status(200).json({ message: "Producto agregado al carrito exitosamente" });
     } else {
      res.status(404).json({ error: "Carrito no encontrado" });
     }
   } catch (error) {
     res.status(500).json({ error: "Error al agregar producto al carrito" });
   }
 });

 // Obtener un carrito por ID
 cartsRouter.get("/:cid", async (req, res) => {
   try {
     const cid = parseInt(req.params.cid);
     const cart = await CM.getCartbyId({ cid });
     res.status(200).json(cart);
   } catch (error) {
     res.status(404).json({ error: "Carrito no encontrado" });
   }
 });

 export default cartsRouter;

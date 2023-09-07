 import { Router } from "express";
 import ProductManager from "../dao/mongomanagers/productManagerMongo.js";
 import currentDir from "../utils.js";
 const PM = new ProductManager("../dao/filemanager/data/prducts.json");
 const router = Router();


 // router.get("/", (req, res) => {
 //   const products = PM.getProduct();

 //   res.render("home", { products, title: "Home" });
 // });

 // router.get("/realtimeproducts", (req, res) => {
 //   const products = PM.getProduct();
 //   res.render("realTimeProducts", { title: "Real Time Products" });
 // });

 // export default router;

 router.get("/",async(req,res)=>{
   const products=await PM.getProduct()
   console.log(products)
   res.render("home", { products, title: "Home" });

 });

 router.get("/realtimeproducts",(req,res)=>{
    const products = PM.getProduct();
    res.render("realTimeProducts", { title: "Real Time Products" });
 });

 router.get("/chat",(req,res)=>{
 res.render("chat")
 })


 export default router;


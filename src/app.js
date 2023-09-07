 import express from "express"
 import currentDir from "./utils.js";
 import handlebars from "express-handlebars"
 import productsRouter from "./routes/products.js";
 import cartsRouter from "./routes/carts.js";
 import viewsRouter from "./routes/views.router.js";
 import "./dao/dbConfig.js"
 import { Server } from "socket.io"


 const app = express();
 const PORT = 8080;

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.use(express.static(`${currentDir}/public`));

 app.engine("handlebars", handlebars.engine());
 app.set("view engine", "handlebars");
 app.set("views", `${currentDir}/views`);

 // app.use("/api/users", usersRouter);
 app.use("/", viewsRouter);
 app.use("/api", cartsRouter);
 app.use("/api/products", productsRouter);


// //mongoose.connect("mongodb+srv://LucasUser:2345mj@cluster0.vowtqem.mongodb.net/")
  
 const httpServer = app.listen(PORT, () => {
    console.log(`Server ON - http://localhost:${PORT}`);
   });


   const io = new Server(httpServer);
   io.on("connection", (socket) => {
     console.log("Cliente conectado!!!");

   })


   // import ProductManager from "./dao/filemanagers/controllers/productManager.js"
   // const pmanagersocket=new ProductManager(__dirname+"/dao/filemanagers/db/products.json")
   import ProductManager from "./dao/mongomanagers/productManagerMongo.js"
   const pmanagersocket=new ProductManager()
  
   // Importar MessagesManager
   import MessagesManager from "./dao/mongomanagers/messageManagerMongo.js";
   const messagesManager = new MessagesManager();
  
 
  
   io.on("connection",async(socket)=>{
       console.log("client connected con ID:",socket.id)
        const listadeproductos=await pmanagersocket.getProduct()
       io.emit("enviodeproducts",listadeproductos)
  
       socket.on("addProduct",async(obj)=>{
       await pmanagersocket.addProduct(obj)
       const listadeproductos=await pmanagersocket.getProduct()
       io.emit("enviodeproducts",listadeproductos)
       })
  
       socket.on("deleteProduct",async(id)=>{
           console.log(id)
          await pmanagersocket.deleteProduct(id)
           const listadeproductos=await pmanagersocket.getProduct({})
           io.emit("enviodeproducts",listadeproductos)
           })
  
  
  
           socket.on("nuevousuario",(usuario)=>{
               console.log("usuario" ,usuario)
               socket.broadcast.emit("broadcast",usuario)
              })
              socket.on("disconnect",()=>{
                  console.log(`Usuario con ID : ${socket.id} esta desconectado `)
              })
         
              socket.on("mensaje", async (info) => {
               // Guardar el mensaje utilizando el MessagesManager
               console.log(info)
               await messagesManager.createMessage(info);
               // Emitir el mensaje a todos los clientes conectados
               io.emit("chat", await messagesManager.getMessages());
             });
      
   })
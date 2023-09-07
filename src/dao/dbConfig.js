  import mongoose from "mongoose"

  const URI="mongodb+srv://LucasUser:2345mj@cluster0.vowtqem.mongodb.net/"

  await mongoose.connect(URI,{
      serverSelectionTimeoutMS:5000,
  })
  console.log("Base de datos conectada....")

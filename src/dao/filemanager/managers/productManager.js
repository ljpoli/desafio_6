// import fs from "fs";

// export default class ProductManager {
//   constructor(path) {
//     this.path = path;
//     this.products = [];
//     this.readProducts();
//   }

//   async generateId() {
//     try {
//       if (fs.existsSync(this.path)) {
//         const productlist = await fs.promises.readFile(this.path, "utf-8");
//         const productlistJs = JSON.parse(productlist);
//         const counter = productlistJs.length;
//         if (counter === 0) {
//           return 1;
//         } else {
//           return productlistJs[counter - 1].id + 1;
//         }
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async addProduct(product) {
//     const { title, description, code, price, status, stock, category, thumbnail } = product;
    

//     if (!title || !description || !code || !price || status === undefined || !stock || !category || !thumbnail) {
//       throw new Error("Todos los campos son obligatorios");
//     }

//     const noDupCode = this.products.some((prod) => prod.code === code);
//     if (noDupCode) {
//       console.error(`Error: product code "${code}" already exists`);
//       return false; // respuesta para el endpoint
//     }

//     const newProduct = {
//       id: await this.generateId(),
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnail,
//     };

//     this.products.push(newProduct);
//     this.saveProducts();

//     console.log(newProduct)
//     return newProduct; // respuesta para el endpoint
//   }

//   getProduct() {
//     try {
//       const data = fs.readFileSync(this.path, "utf-8");
//       this.products = JSON.parse(data);
//     } catch (error) {
//       this.products = [];
//     }
//     return this.products;
//   }

//    getProductById(id) {
//      const product = this.products.find((p) => p.id === id);
//      if (!product) {
//        throw new Error("Producto no encontrado");
//      }
//     return product;
//    }

//    updateProduct(id, updatedFields) {
//      const productIndex = this.products.findIndex((p) => p.id === id);
//      if (productIndex === -1) {
//        throw new Error("Producto no encontrado");
//      }
//      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
//      this.saveProducts();
//    }

//    deleteProduct(id) {
//      this.products = this.products.filter((p) => p.id !== id);
//      this.saveProducts();
//    }

//    readProducts() {
//     try {
//       const data = fs.readFileSync(this.path, "utf-8");
//       this.products = JSON.parse(data);
//     } catch (error) {
//       this.products = [];
//     }
//   }
  
  

//    saveProducts() {
//      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf-8");
//    }
//  }


import { productsModel } from "./products.model";

export default class ProductManager {
  async addProduct(product) {
    try {
      const newProduct = new productsModel(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      throw error;
    }
  }

  async getProduct() {
    try {
      const products = await productsModel.find().exec();
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await productsModel.findById(id).exec();
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      throw error;
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const updatedProduct = await productsModel.findByIdAndUpdate(id, updatedFields, {
        new: true, // Devuelve el documento actualizado
      }).exec();
      if (!updatedProduct) {
        throw new Error("Producto no encontrado");
      }
      return updatedProduct;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await productsModel.findByIdAndDelete(id).exec();
      if (!deletedProduct) {
        throw new Error("Producto no encontrado");
      }
      return deletedProduct;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
}


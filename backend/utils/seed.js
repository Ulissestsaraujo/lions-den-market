const { dbConnection, Product, ProductImage } = require("../models/product");

const fs = require("fs");
const { getAllProducts } = require("../services/productService");

function readProducts() {
  const data = fs.readFileSync("../products.json", {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(data).products;
}

function insertAllDummyProducts(products) {
  dbConnection
    .transaction(async (t) => {
      for (const product of products) {
        const newProduct = await Product.create(product, { transaction: t });
        const productImagesWithProductId = product.images.map((image) => ({
          url: image,
          product_id: newProduct.id,
        }));

        await ProductImage.bulkCreate(productImagesWithProductId, {
          transaction: t,
        });
      }
      await t.commit();
    })
    .catch((err) => {
      console.error("Error adding new products and images:", err);
    });
}

function seed() {
  let products = getAllProducts();
  if (products.length === 0) {
    products = readProducts();
    insertAllDummyProducts(products);
  }
}

module.exports = { seed };

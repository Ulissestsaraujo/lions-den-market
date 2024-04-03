const {  Product, ProductImage } = require("../models/product");
const {dbConnection} = require("../models/db")

const fs = require("fs");
const { getAllProducts } = require("../services/productService");
const { Category } = require("../models/category");

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
        const newProduct = await Product.create(
          {
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            thumbnail: product.thumbnail,
          },
          { transaction: t }
        );
        const productImagesWithProductId = product.images.map((image) => ({
          url: image,
          product_id: newProduct.id,
        }));

        await ProductImage.bulkCreate(productImagesWithProductId, {
          transaction: t,
        });

        let category = await Category.findOne({
          where: { name: product.category },
        });

        if (!category) {
          category = await Category.create({ name: product.category },
            { transaction: t });
        }
        await newProduct.setCategory(category);
      }
      await t.commit();
    })
    .catch((err) => {
      console.error("Error adding new products and images:", err);
    });
}

async function  seed() {
  let products = await getAllProducts();
  if (products.length === 0) {
    products = readProducts();
    insertAllDummyProducts(products);
  }
}

module.exports = { seed };

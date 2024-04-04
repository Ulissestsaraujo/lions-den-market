const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const { dbConnection } = require("./models/db");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.listen(PORT, () => {
  // Sync the models with the database (creates tables if they don't exist)
  dbConnection
    .sync()
    .catch((err) =>
      console.error("Error syncing models with the database:", err)
    );

  console.log(`Server is running on port ${PORT}`);
});

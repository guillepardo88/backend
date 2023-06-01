import express from "express";
import productManager from "./entregaTres.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.get("/api/products", async (req, res) => {
  const products = await productManager.getProducts();
  const limit = parseInt(req.query.limit);
  if (!limit) {
    return res.json(products);
  } else {
    if (limit > products.length) {
      return res.status(400).json({
        error: "Exced the limit of the products",
      });
    } else {
      return res.status(200).json(products.slice(0, limit));
    }
  }
});

app.get("/api/products/:pid", async (req, res) => {
  const idRequested = parseInt(req.params.pid);
  const userSearch = await productManager.getProductById(idRequested);
  if (userSearch) {
    return res.status(200).json(userSearch);
  } else {
    return res.status(400).json({ error: userSearch });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const productToAdd = req.body;
    const products = await productManager.addProduct(productToAdd);
    res.status(200).json({ products });
  } catch (error) {
    if (
      error.message === "Product info is not valid. Please chek de info bro"
    ) {
      return res.status(400).json({ message: error.message });
    }
    if (
      error.message ===
      `The ${req.body.code} is already exist, use a diferent code rigth now!`
    ) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/products/:pid", async (req, res) => {
  const idProduct = parseInt(req.params.pid);
  const newProduct = req.body;
  const productModify = await productManager.updateProduct(
    idProduct,
    newProduct
  );
  if (!productModify) {
    res.status(200).json({ message: "Product modified" });
  } else {
    res.status(400).json({ error: productModify });
  }
});

app.delete("/api/products/:pid", async (req, res) => {
  const idToDelete = parseInt(req.params.pid);
  const productEliminated = await productManager.deleteProduct(idToDelete);
  if (!productEliminated) {
    res.status(200).json({ message: "Product eliminated" });
  } else {
    res.status(400).json({ error: productEliminated });
  }
});

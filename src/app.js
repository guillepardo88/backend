import express from 'express';
import ProductManager from './entregaTres.js';


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

app.get('/api/products', async (req, res) => {
    const products = await ProductManager.getProducts();
    const limit = parseInt(req.query.limit);
    if (!limit) {
        return res.json(products)
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

app.get('/api/products/:pid', async (req, res) => {
    const idRequested = parseInt(req.params.pid);
    const userSearch = await ProductManager.getProductsById(idRequested);
    if (userSearch) {
        return res.status(200).json(userSearch);
    } else {
        return res.status(400).json({error: userSearch});
    }
});

app.post("/api/products", async (req, res) => {
    const productToAdd = req.body;
    const products = await ProductManager.addProduct(productToAdd)
    if (!products) {
        res.status(200).json({ message: "Product added"});
    } else {
        res.status(400).json({ error: products})
    }
});


app.put("/api/products/:pid", async (req, res) => {
    const idProduct = parseInt(req.params.pid);
    const newProduct = req.body;
    const productModify = await ProductManager.updateProduct(idProduct, newProduct);
    if(!productModify) {
        res.status(200).json({ message: "Product modified"})
    } else {
        res.status(400).json({error: productModify});
    }
});

app.delete("/api/products/:pid", async (req, res) => {
    const idToDelete = parseInt(req.params.pid);
    const productEliminated = await ProductManager.deleteProduct(idToDelete);
    if (!productEliminated) {
        res.status(200).json({ message: "Product eliminated"});
    } else {
        res.status(400).json({ error: productEliminated})
    }
});


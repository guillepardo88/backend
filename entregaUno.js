    class ProductManager {
        id = 1;
    
        constructor() {
        this.products = [];
        }
    
        addProduct(product) {
        let checkCode = this.products.find((p) => p.code === product.code);
        if (checkCode) {
            return 'This code already exists';
        }
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock
        ) {
            return 'Fields missing';
        }
        let newProduct = { ...product, id: this.id };
        this.products.push(newProduct);
        this.id++;
        return 'Product added';
        }
    
        getProducts() {
        return this.products;
        }
    
        getProductById(id) {
        let found = this.products.find((p) => p.id === id);
        if (!found) {
            return 'Not found';
        }
        return found;
        }
    }
    
    const product = {
        title: 'papitas2',
        description: 'Papas',
        price: 500,
        thumbnail: "not found",
        code: 'a1',
        stock: 20,
    };
    const product2 = {
        title: 'papitas',
        description: 'Papas',
        price: 150,
        thumbnail: "not found",
        code: 'a2',
        stock: 65,
    };
    
    const productManager = new ProductManager();
    
    console.log(productManager.addProduct(product));
    console.log(productManager.addProduct(product2));
    console.log(productManager.getProducts());
    console.log(productManager.getProductById(2));
    
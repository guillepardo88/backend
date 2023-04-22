const fs = require("fs");
const { pid } = require("process");
const { json } = require("stream/consumers");

class ProductManager {
    
        constructor(path) {
            this.path = path;
        }
    
        async addProduct(productInfo) {
        const {title, description, price, thumbnail, code, stock} = productInfo;
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return "Product info is not valid. Please chek de info bro"
        }
        const product = await this.getProducts()
        if (product.some(product => product.code === code)){
            return `The ${code} is already exist, use a diferent code rigth now!`
        }

        const id = product[product.length - 1] ?.id + 1 || 1; 
        const newProduct = { 
            id, title, description, price, thumbnail, code, stock
        };
        product.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(product, null, 2));
        return newProduct;
        }
    
        async getProducts() {
        let product = []
        if (fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            product = JSON.parse(data);
        }
        return product
        }
    
        async getProductById(pid) {
        let found = await this.getProducts();
        let productFound = found.find(product => product.id === pid);
        if(!productFound){
            return `Product with ${pid} is not found`
        }
        return productFound;
        }

        

        async updateProduct(pid, changes){
            const product = await this.getProducts();
            const productIndex = product.findIndex (product => product.id === pid);
            if(productIndex === -1){
                return `Product with ${pid} is not found`;
            }
            const productFound = product[productIndex];
            if(productFound.code === code){
                return `The code ${code} is already exist. Check out better!`
            }
            const productUpdate = {...productFound, ...changes}
            product[productIndex] = productUpdate
            fs.promises.writeFile(this.path, JSON.stringify(product, null, 2));
        }

        async deleteProduct(pid){
            let product = await this.getProducts();
            if(!product.some(product => product.id === pid)){
                return `Product with id ${pid} is not found`
            }
            const newProduct = product.filter(product => product.id !== pid);
            await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null, 2));
        }
    }
    
    const product = {
        title: 'play 6',
        description: 'gamer',
        price: 9500,
        thumbnail: "not found",
        code: 'p1',
        stock: 5,
    };
    const product2 = {
        title: 'play 5',
        description: 'gamer',
        price: 10500,
        thumbnail: "not found",
        code: 'p2',
        stock: 15,
    };
    
    const productManager = new ProductManager("products.json");
    
    productManager.addProduct(product).then(response => {
        console.log(response);
    })
    //productManager.addProduct(product2).then(response => {
    //    console.log(response);
    //})
    
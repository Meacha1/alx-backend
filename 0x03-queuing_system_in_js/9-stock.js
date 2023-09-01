import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Define a list of products with relevant information
const productList = [
  {
    productId: 1,
    productName: 'Travel Bag 250',
    price: 50,
    initialQuantity: 4,
  },
  {
    productId: 2,
    productName: 'Travel Bag 450',
    price: 100,
    initialQuantity: 10,
  },
  {
    productId: 3,
    productName: 'Travel Bag 650',
    price: 350,
    initialQuantity: 0,
  },
  {
    productId: 4,
    productName: 'Travel Bag 1050',
    price: 550,
    initialQuantity: 5,
  },
];

/* Data Access Functions */

// Get a product by its ID
function getProductById(id) {
    return productList.filter((product) => product.productId === id);
}

/* Express Server Configuration */

const app = express();
app.listen(1245, () => {
    productList.forEach((product) => reserveStockById(product.productId,
      product.initialQuantity));
});

// Endpoint to retrieve the list of products
app.get('/products', (req, res) => {
    res.json(productList);
});

/* Product Detail Endpoint */

app.get('/products/:productId', async (req, res) => {
    const productId = Number(req.params.productId);
  
    const product = getProductById(productId);
    const stock = await getCurrentReservedStockById(productId);
  
    if (product.length > 0) {
      product[0].currentQuantity = stock;
      res.json(product[0]);
      return;
    }
  
    res.status(404).json({ status: 'Product not found' });
});

/* Reserve a Product Endpoint */

app.get('/reserve/:productId', async (req, res) => {
    const productId = Number(req.params.productId);
  
    const product = getProductById(productId);
  
    if (product.length < 1) {
      res.status(404).json({ status: 'Product not found' });
      return;
    }
  
    const stock = await getCurrentReservedStockById(productId);
  
    if (stock < 1) {
      res.status(403).json({ status: 'Not enough stock available', productId });
      return;
    }

    reserveStockById(productId, stock);
    res.json({ status: 'Reservation confirmed', productId });
});

/* Redis Connection Setup */

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

// Function to reserve stock by product ID
function reserveStockById(productId, stock) {
    client.set(productId, stock);
}
  
// Function to get the current reserved stock by product ID
async function getCurrentReservedStockById(productId) {
    const stock = await getAsync(productId);
    return stock;
}

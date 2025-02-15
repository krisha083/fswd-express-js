const express = require('express');
const app = express();
const port = 3000;

// Expanded product data with 30 products across categories
const products = [
  // Electronics
  { id: 1, name: 'Laptop', category: 'electronics', price: 1200 },
  { id: 2, name: 'Mobile', category: 'electronics', price: 800 },
  { id: 3, name: 'Earphone', category: 'electronics', price: 50 },
  { id: 4, name: 'Headphone', category: 'electronics', price: 100 },
  { id: 5, name: 'Speaker', category: 'electronics', price: 150 },
  { id: 6, name: 'Tablet', category: 'electronics', price: 300 },
  { id: 7, name: 'Smartwatch', category: 'electronics', price: 200 },
  { id: 8, name: 'Bluetooth Speaker', category: 'electronics', price: 60 },
  { id: 9, name: 'Keyboard', category: 'electronics', price: 40 },
  { id: 10, name: 'Mouse', category: 'electronics', price: 30 },

  // Stationary
  { id: 11, name: 'Pen', category: 'stationary', price: 2 },
  { id: 12, name: 'Pencil', category: 'stationary', price: 1 },
  { id: 13, name: 'Eraser', category: 'stationary', price: 0.5 },
  { id: 14, name: 'Sharpener', category: 'stationary', price: 1 },
  { id: 15, name: 'Notebook', category: 'stationary', price: 3 },
  { id: 16, name: 'Colors', category: 'stationary', price: 5 },
  { id: 17, name: 'Ruler', category: 'stationary', price: 1.5 },
  { id: 18, name: 'Highlighter', category: 'stationary', price: 2.5 },
  { id: 19, name: 'Sketchpad', category: 'stationary', price: 6 },
  { id: 20, name: 'Marker', category: 'stationary', price: 4 },

  // Clothes
  { id: 21, name: 'Top', category: 'clothes', price: 15 },
  { id: 22, name: 'Jeans', category: 'clothes', price: 40 },
  { id: 23, name: 'T-shirt', category: 'clothes', price: 20 },
  { id: 24, name: 'Shirt', category: 'clothes', price: 25 },
  { id: 25, name: 'Skirt', category: 'clothes', price: 18 },
  { id: 26, name: 'Pant', category: 'clothes', price: 30 },
  { id: 27, name: 'Jacket', category: 'clothes', price: 50 },
  { id: 28, name: 'Sweater', category: 'clothes', price: 35 },
  { id: 29, name: 'Dress', category: 'clothes', price: 45 },
  { id: 30, name: 'Shoes', category: 'clothes', price: 60 },

  // Food
  { id: 31, name: 'Vegetables', category: 'food', price: 10 },
  { id: 32, name: 'Flour Pack', category: 'food', price: 5 },
  { id: 33, name: 'Rice Pack', category: 'food', price: 7 },
  { id: 34, name: 'Sugar Pack', category: 'food', price: 3 },
  { id: 35, name: 'Oil Pack', category: 'food', price: 6 }
];

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Middleware for handling JSON requests
app.use(express.json());

// GET /products: Return all products or filter by category
app.get('/products', (req, res) => {
  const { category } = req.query;

  if (category) {
    const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    return res.json(filteredProducts);
  }

  return res.json(products);
});

// GET /products/:id: Fetch a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

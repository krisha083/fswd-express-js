const express = require("express"); 
const fs = require("fs"); 
const path = require("path"); 
 
const app = express(); 
const PORT = 1409; 
const LOG_FILE = path.join(__dirname, "visits.log"); 
 
app.use((req, res, next) => { 
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip}\n`; 
    fs.appendFile(LOG_FILE, logEntry, (err) => { 
        if (err) console.error("Error writing to log file:", err); 
    }); 
    next(); 
}); 
 
app.use(express.static(path.join(__dirname, "public"))); 
 
app.get("/logs", (req, res) => { 
    fs.readFile(LOG_FILE, "utf8", (err, data) => { 
        if (err) { 
            return res.status(500).json({ error: "Could not read log file" }); 
        } 
        const logs = data.trim().split("\n").map(line => { 
            const [time, ip] = line.split(" - IP: "); 
            return { time, ip }; 
        }); 
        res.json(logs); 
    }); 
}); 
 
app.listen(PORT, () => { 
    console.log(`🚀 Server starts at PORT${PORT}`); 
}); 

const express = require("express"); 
 
const app = express(); 
const PORT = 3000; 
 
const products = [ 
    { id: 1, name: "Laptop", category: "electronics", price: 1200 }, 
    { id: 2, name: "Phone", category: "electronics", price: 800 }, 
    { id: 3, name: "T-shirt", category: "fashion", price: 20 }, 
    { id: 4, name: "Shoes", category: "fashion", price: 50 }, 
    { id: 5, name: "Headphones", category: "electronics", price: 100 } 
]; 
 
app.get("/products", (req, res) => { 
    const { category } = req.query; 
 
    if (category) { 
        const filteredProducts = products.filter(p => p.category === 
category.toLowerCase()); 
        return res.json(filteredProducts); 
    } 
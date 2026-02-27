const express = require('express');
const cors = require('cors');
const products = require("./data/products");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.post("/api/ask", (req, res) =>{
    const { query } = req.body;
    const Query = query.toLowerCase();

    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(Query));

    res.json(filteredProducts);

    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express')
const app = express()
const product = require('./models/productModels')
const mongoose = require('mongoose')
const Product = require('./models/productModels')

app.use(express.json())
//routes
app.get('/', (req, res) => {
    res.send('Hello Node')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog My name is Caleb')
})

app.get('/product', async(req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/product/id:', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://caleb65:00009@calebapi.twnhqyu.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')
    });
}).catch(() => {
    console.log('error ')
})
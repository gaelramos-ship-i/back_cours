const Product = require("../models/productModel")

// Fournir tous les produits 
exports.getAllProducts = async (req, res) => {
    try {
        // Va chercher dans la bdd tous les produits
        const product = await Product.find()
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product == null){
            return res.status(404).json({message: "Produit non trouvé"})
        }
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Créer un produit
exports.createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        })

        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Mettre a jour un produit

exports.updateProduct = async (req, res) => {
    try {
        // est ce que le produit existe 
        const product = await Product.findById(req.params.id)
        if(product == null){
            return res.status(404).json({message: "Produit non trouvé"})
        }

        if(req.body.name != null){
            product.name = req.body.name
        }

        if(req.body.price != null){
            product.price = req.body.price
        }

        if(req.body.stock != null){
            product.stock = req.body.stock
        }

        const updateProduct = await product.save()
        res.json(updateProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product == null){
            return res.status(404).json({message: "Produit non trouvé"})
        }
        await product.deleteOne()
        res.json({message: "Le produit à été supprimé"})
        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

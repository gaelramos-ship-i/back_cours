const express = require('express')
const app = express()
const port = 3000
// import des routes
const productsRoutes = require('./routes/products')

app.use(express.json())

// Monte le routeur sur le chemin de base
app.use('/api/v1/products', productsRoutes)

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})
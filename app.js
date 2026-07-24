const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
// Pour pouvoir utiliser les variables d'environnements
// Ne pas oublier d'installer dotenv : `npm install dotenv`
// Ensuite pour utiliser : process.env.NOM_VARIABLE_DANS_ENV
require('dotenv').config()
require('./config/db')
const { sequelize, connectDB } = require('./config/database')
//Connexion a la BDD
const startServer = async () => {
    await connectDB()

    //Créer les tables si elles n'existent pas
    await sequelize.sync({ alter: false })
    console.log('Tables synchronized')
}

// import des routes
const productsRoutes = require('./routes/productsRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const userSeqRoutes = require('./routes/userSeqRoutes')
startServer()

app.use(express.json())
// Si on ne met pas de paramètre on autorise TOUS les accès
// On peut configurer des options pour autoriser certaines ressources 
const corsOptions = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v2/users', userSeqRoutes)



// Monte le routeur sur le chemin de base
app.use('/api/v1/products', productsRoutes)



app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})
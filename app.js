const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
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
    // await sequelize.sync({ alter: false })
    console.log('Tables synchronized')
}

// import des routes
const productsRoutes = require('./routes/productsRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const userSeqRoutes = require('./routes/userSeqRoutes')
startServer()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Fenetre de 15 minutes,
    limit: 100, // Max 100 requêtes par IP sur ce créneau
    message: { status: 429, error: 'Trop de requête, réessayez plus tard.'}
})
app.use(limiter)

// Configuration recommandée pour une API REST
app.use(
    helmet({
        // La CSP (content security policy)
        // Pour une api puremenr JSON, on désactive la CSP
        contentSecurityPolicy: false,
        // Si votre api interagit avec d'autres domaines 
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }) 
)

/*
Helmet est un middleware qui configure automatiquement 15 en-têtes HTTP pour sécuriser votre serveur Express : 
    * X-Powered-By (Masqué) : Supprime l'en-tête `X-powered-By: Express` pour ne pas révéler votre stack
    * Strict-Transport-Security  (HSTS) : Force les navigateurs à se connecter uniquement en HTTPS 
    * X-Frame-Options : Empeche votre site d'être intégré dans un `<frame>` ou `<iframe>`, protection contre le clickjacking
    * X-Content-Type-Options : Force le navigateur à respecter le type MEME déclaré pour éviter l'éxécution de scripts malveillants
    * X-XSS-Protection : Active le filtre XSS sur les navigateurs plus anciens
*/

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
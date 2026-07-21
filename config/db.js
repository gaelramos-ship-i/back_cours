const mongoose = require('mongoose')

// const dbURI = "mongodb+srv://ramosgael108_db_user:8nIQLlOqYBrsKTUW@coursback.nlpsvjr.mongodb.net/?appName=CoursBack"

const dbURI = process.env.MONGODB_URI

mongoose.connect(dbURI)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(err => console.error("Erreur de connexion à MongoDB :", err))

module.exports = mongoose.connection
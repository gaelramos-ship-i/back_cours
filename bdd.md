# Le principe de Modèle
Les modèles sont des représentations des données de votre application et de la logique métier associée. Ils sont responsables de l'interaction avec la base de données (création, lecture, mise à jour, suppresion des données) et de la validation des données. Dans une application Node avec MongoDB, Mongoose est couramment utilisé pour définir les hémas de données et interargir avec la base de données, agissant ainsi comme la couche modèle.

**Exemple de modèle avec Mongoose :** 
/!\ Attention : Pour utilise mongoose, il faut installer avec `npm install mongoose`

```javascript
// models/productModel.js
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    creationDate: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Product', productSchema)
```

# Manipulation de BDD avec MongoDB et Mongoose
## Introduction à MongoDB
MongoDB est une base de données NoSQL orientée document, ce qui signifie qu'elle stocke les données sous forme de documents BSON (binary JSON) avec des schemas flexibles.
Contrairement aux base de données relationnelles traditionnelles qui utilisent des tables et des lignes, MongoDB utilise des collections et des documents. Cette flexibilité en fait un excellent choix pour les applications qui nécessitent une évolutivité rapide et la gestion de données non structurée ou semi-structurée.

**Concepts clés de MongoDB :** 
* **Document :** L'unité de base de ddonnées dans MongoDB. Un document est un ensemble de paires clé-vaaleur, similaire à unobjet JSON. Les documents peuvent avoir des structures dufférentes au sein de la même collection.
* **Collection :** Un groupe de documents. L'équivalent d'une table dans une base de données relationnelle. Une collection ne force pas de schéma stricte sur ses document.
* **Base de données :** Un conteneur pour les collections. Un serveur MongoDB peut héberger plusieur base de données.

**Avantages de MongoDB :**
* **Flexibilité des schémas :** Permet de stocker des documents avec des structures différnetes dans la même collection, ce qui facilite l'évolution des applications.
* **Haute performance :** Concu pour la vitesse et l'évoltivité, capable de gérer de grand volumes de données et de requêtes.
* **Scalabilité horizontale :** Facile a mettre à l'echelle en distribuant les données sur plusieurs serveurs (sharding). 
* **Richesse des requêtes :** Supporte des requêtes complexes, l'indexation et l'agrégation de données. 

/!\ Comme avec MySQL, vous pouvez utiliser MongoDB soit en local, soit depuis un hebergement ATLAS (site MongoDB)

## Introduction à Mongoose 
Mongoose est une bibliothèque ODM (object Data Modelling) pour MongoDB et Node. Elle fournit une solution basée sur des schémas pour modéliser les données de votre application, ce qui simplifie les interactions avec la base de données. Mongoose gère les relations entre les données, fournit une validation de schéma et est largement utilisé pour la modélisation d'objets MongoDB dans un environnement asynchrone.

**Pourquoi utiliser Mongoose ?**
* **Validation de schéma :** Mongoose vous permet de définir vos shéma pour vos documents, garantissant que les données stockées dans MongoDB respectent une structure définie et des règles de validation.
* **Modélisation des données :** Facilite la création de modèles Javascript qu correspondent à vos collections MongoDB, permettant d'interargir avec la base de données en utilisant des objets Javascript.
* **Middleware :** Permet d'exécuter des fonctions avant et après certaines opérations de base de données (par exemple, avant de sauvegarder un document).

## Connexion à MongoDB avec Mongoose
Pour connecter votre application Node à une base de données MongoDB en utilisant Mongoose, vous devez d'abord installer Mongoose : 
```bash
npm install mongoose
```

Ensuite, dans vootre fichier 'app.js' (ou un fichier de configuration de base de données séparé) : 
```javascript
// app.js ou /config/db.js
const mongoose = require('mongoose')

// const dbURI = "mongodb+srv://DONNEES_DE_MONGODB"
const dbURI = "mongodb://ramosgael108_db_user:<db_password>@ac-mgprg5d-shard-00-00.nlpsvjr.mongodb.net:27017,ac-mgprg5d-shard-00-01.nlpsvjr.mongodb.net:27017,ac-mgprg5d-shard-00-02.nlpsvjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-pcbz67-shard-0&authSource=admin&appName=CoursBack"

mongoose.connect(dbURI)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(err => console.error("Erreur de connexion à MongoDB :", err))

// Si vous n'intégrez pas le code dans app.js, on fait l'export
module.exports = mongoose.connection

//Dans app.js, juste AVANT le premier app.use, intégrer avec : 
// require('./config/db')
// Si votre fichier s'apelle db.js et se trouve dans le dossier config
```

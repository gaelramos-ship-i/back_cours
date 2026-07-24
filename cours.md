# API RestFul avec Node.js et Express

## 1. Qu'est ce qu'une API ?

Une API (Application Programming Interface) est un ensemble de eègles qui pemret à deux logiciels de communiquer entre eux. Elle définit **comment** un client peut demander des données ou des actions à un serveur, et **comment** ce dernier doit répondre.

**Analogie du restaurant :**
Le client ne va pas en cuisine préparer son plat. Il passe commande aupès du serveur (l'API), qui transmet la demande à la cuisine (le backend) et rapporte le plat (la réponse).

Dans le développement web, l'API est le pont entre le front-end (ce que voit l'utilisateur) et le backend (la base de données, la logique métier).

## 2. Qu'est ce que REST ? 

REST (*Reprentational State Transfer*) est un style d'architecture définit par Roy Fielding en 2000. Ce n'est **pas** une technologie ni un protocole, mais un ensemble de principes à respecter pour concevoir une API cohérente et scalable.

### Les 6 contraintes REST

| # | Contrainte | En résumé | 
|---|------------|-----------|
| 1 | Client-Serveur | Le front et le back sont séparés et évoluent indépendamment |
| 2 | Sans état (*starless*) | Chaque requête contient toutes les infos nécessaires ; le serveur n mémorise rien entre deux requetes  |
| 3 | Cacheable | Les réponses indiquent si elles peuvent être mises en cache |
| 4 | Interface uniforme | Les ressources sont identifiées par des URI, manipulées via des représentations (JSON...) |
| 5 | Système en couches | Le client ignore s'il parle au serveur final ou à un proxy/load balancer |
| 6 | Code à la demande *(optionnel)* | Le serveur peut envoyer du code exécutable au client |

### Une API RESTful, concretement

* Une **ressource** = une entité métier (un produit, un utilisateur...), identifiée par une URI.
* On nomme les URI avec des **noms**, jamais des verbes : 
    * ✅ `GET /api/products`
    *  `GET /api/getAllProducts`
* Les actions (créer/lire/modifier/supprimer) sont portées par le **verbe HTTP**, pas par l'URL 

### Verbes HTTP -> CRUD

| Verbe HTTP | Action CRUD | Exemple |
|------------|-------------|---------|
| GET | Read | `GET /api/products/123` |
| POST | Create | `POST /api/products` |
| PUT | Update (remplacement complet) | `PUT /api/products/123` |
| PATCH | Update (modification partielle) | `PATCH /api/products/123` |
| DELETE | Delete | `DELETE /api/products/123` |


### Codes de statut HTTP à connaitre 

* **2xx - Succès** : `200 OK`, `201 Created`, `204 No Content`
* **4xx - Erreur client** : `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
* **5xx - Erreur serveur** : `500 Internal Server Error`

---

## 3. Node.js et Express.js

### Node.js
Un environnement d'éxécution javascript **coté serveur**, basé sur le moteur V8 de Chrome. Il permet d'utiliser le même langage (JS) sur le front et le back, et gère efficacement de nombreuses connesions simultanées grâce à son modèle asynchrone non bloquant.

### Express.js
Un framework web minimaliste pour Node.js. Il facilite : 
* La définition de routes HTTP,
* L'utilisation de middlewares,
* La connexion à une base de données,
* L'envoi de réponse (JSON, HTML, ...).

---

## 4. Mettre en place un serveur Express

### Etape 1 - Initialiser le projet
```bash
npm init -y
```

### Etape 2 - Installer Express
```bash
npm install express # ou
npm i express
```

### Etape 3 - Créer `app.js`
```javascript
const express = require('express')
const app = express()
const port = 3000

//      URL
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () => {
    // Ce console log s'affiche uniquement côté SERVEUR et non côté CLIENT
    console.log(`Serveur démarré sur http://localhost:${port}`)
})
```

### Etape 4 - Lancer le serveur
```bash
node app.js # ou
nodemon app.js
```

Pour lancer le serveur avec nodemon, vous devez l'installer avec `npm install -g nodemon`.
Lancer le serveur avec nodemon permet de recharger automatiquement le serveur à chaque chargement dans vos fichiers, un peu comme fait l'eextension Live Server.

Vous pouvez ouvrir `http://localhost:3000` dans le navigateur.

### Organiser le code avec `express.Router()`
Pour ne pas tout entasser dans `app.js`, on sépare les routes par ressource : 

```javascript
// routes/users.js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'Lucas'
        },
        {
            id: 2,
            name: 'Gabriel'
        },
    ])
})

// Quand on veux passer un paramètre dans l'url on utilise :nomDuParamètre
router.get('/:id', (req, res) => {
    res.send(`Détailes de l'utilisateur : ${req.params.id}`)
})

// Très important pour pouvoir l'utiliser 
module.exports = router
```

```javascript
// app.js
const userRoutes = require('./routes/user.js')
app.use('/api/v1/users', userRoutes)
```

### Architecture recommandée (MVC simplifié)

```
mon-api/
├── app.js
├── routes/         → définit les endpoints, dirige vers les contrôleurs
├── controllers/    → logique métier, prépare la réponse
├── middlewares/    → s'exécute avant la route finale
└── models/         → schéma des données, interaction avec la BDD
```

## 5. Les middlewares

Un middlewares est une fonction qui à accès a `req`, `res`, et à `next()`. Elle s'éxecute **avant** que la requete n'atteigne sa route finale, et on peut : 
* lire ou modifier `req` et `res`,
* arrêter la requête en renvoyant une réponse,
* ou la laisser continuer en appelant `next()`.

Avec les middlewares vous pouvez tester l'authentification, faire une midlleware de gestion d'erreurs, de log, etc.

Les middleswares s'executent **dans l'ordre ou ils sont déclarés** avec `app.use()`.

### Exemple 1 - Middleware de journalisation
```javascript
const express = require('express')
const app = express()

// Middleware global : s'applique à toutes les requêtes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next() // indispensable : passe la main à la suite
})

app.get('/', req, res) => {
    res.send('Accueil')
}

app.listen(3000)
```

### Exemple 2 - Middlewares intégrés à Express (parsing du body)
```javascript
app.use(express.json())                     //parse les requêtes JSON
app.use(express.urlencode({extend: true}))  //parse les formulaires classiques 

app.post('/data', (req, res) => {
    console.log(req.body) // accesible uniquement grâce au middleware ci-dessous
    res.send('Données reçues')
})
```

### Exemple 3 - Middleware d'authentification simple (sur une route précise)
Un middleware peut être global (`app.use`) ou appliquer à une seule route, en le passant comme argument avant le handler final : 

```javascript
function checkToken(req, res, next) {
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: 'Accès refusé : token manquant'})
    }

    // On intègre la logique de vérification du token
    next() // token valide, on continue vers la route
}

// Au niveau de la route concerné 
// On applique le middleware à une route spécifique
routeur.delete('/:id', checkToken, productController.deleteProduct)
```

**Point clé :** si `next()` n'est jamais appelé (et qu'aucune réponse n'est envoyée), la requête reste bloquée indéfiniment coté client.


## 6. L'authentification
Afin de gérer un système d'authentification vous allez avoir besoin d deux choses : 
* **bcrypt :** Pour hasher les mots de passe utilisateur 
* **jsonwebtoken :** Pour gérer les jetons d'authentification 

Les jetons d'authetification (token) peuvent être encodés avec une durée spécifique ainsi qu'avec des informations supplémentaires. Géneralement on y ajoute l'id de l'utilisateur.

## Installation des packages 
```bash
npm install bcryptjs jsonwebtoken
```

### CORS (Cross origin ressource sharing)

* Autoriser ou non l'acces au ressource depuis un endroit précis.
* Serveur distant avec des cors non autorisé, bloque l'accés.
* On peux definir differente adresses autorisées 

`npm install cors`

`app.js`: 
```javascript
const cors = require('cors')

// Si on ne met pas de paramètre on autorise TOUS les accès
// On peut configurer des options pour autoriser certaines ressources 
const corsOptions = {
    // On utilise un [] pour autoriser plusieur acces 
    origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))
```
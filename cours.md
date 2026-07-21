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

### Etape 1 -
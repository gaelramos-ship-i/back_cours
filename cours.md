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
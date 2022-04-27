<b>[RETOUR AU MENU PRINCIPAL](../README.MD)</b>


## Technologies

1. TypeScript
2. Apollo Server pour pouvoir gérer le graphql
(ici apollo server utilise express)
3. bcrypt : pour la méthode hash (hachage de password) et pour compare (comparer le password avec celui stocker en bdd)
4. cookie : pour pouvoir parser les cookie envoyer par le front (on utilise la méthode parse de la bibliothèque )
5. crypto: on utilise randomBytes pour générer une session avec un id "aléatoire" : getRandomHexID
6. dotenv : pour pouvoir utiliser les variables d'environnement
7. graphql : pour pouvoir utiliser graphql
8. express: pour pouvoir utiliser express
9. jest: pour les tests
10. pg: pour pouvoir utiliser postgresql
11. supertest: pour gérer un server express pour les test et notamment pouvoir gérer les cookies pour les tests
12. typeorm: Notre ORM qui nous sert de surcouche entre posttgresql et notre application, il nous donne également les différentes annotations permettant de signaler les entites, ...
13. type-graphql: permet de gérer les typages, validation, champs accessible, ... depuis /graphql

## Installation
Rien => on utilise docker-compose à l'installation

## Usage

### Models :
Dans les modèles on trouve deux types d'annotations :

```JS
  @Column() // Créer un champ en base de données
  @Field()  // Indique à typeGraphQL que l'on peut accéder à ce champ
```
# NOTICE

## How to start the project

<br>

### Launch the project

### The first time
``` BASH
docker-compose up --build
```

It will launch 4 container :
- `db_redlion`
- `db_test_redlion`
- `front_redlion`
- `back_redlion`


### To launch the docker-compose in production
``` BASH
GATEWAY_PORT=8000 docker-compose -f docker-compose.prod.yml up --build
```

### Just to re-start the containers
``` BASH
docker-compose start
```


### Congifuration of CI : GitHub actions :
In the file
.github/workflows/pûsh.yml

We execute the test on the current branch and we execute the file ./ci-api.sh

### How to run CI Checks
``` BASH
./ci-api.sh
```

CI API just launch the file docker-compose.ci.api.yml and build 2 containers :
- back
- test_database

There is just one more information :
``` BASH
--exit-code-from back
```

In order to have the exit code : 0 or 1 from the container back (when we execute the test we have an exit code which is 0 or 1)



### Just to go in postgre container

``` BASH
docker-compose exec database psql -h localhost -p 5432 -U postgres -W
```

ou pour la table de test

``` BASH
docker-compose exec test-database psql -h localhost -p 5432 -U postgres -W
```

mot de passe c'est root

Et pour voir les tables la commande c'est

```PostgreSQL
\d
```

### In order to reload the fixtures

Use the shell file `reload_fixtures.sh`

1. Make sur the containers are running
``` BASH
docker-compose start
```

2. Launch the shell file `reload_fixtures.sh`

``` BASH
./reload_fixtures.sh
```

<br><br>
### SOMETHING IS WRONG ? if something is wrong with your rights in order to write in a container  <p>

``` BASH
docker exec -it container_in_issue ash
```

In the container, for instance if you can't write in the node_modules

``` BASH
chmod -R 777 app/node_modules
```

<br><br>
### SOMETHING IS WRONG ? if something is wrong with a package recently installed  <p>

``` BASH
docker-compose build --no-cache
```
# README

## Sommaire

- [BACK](back/README.MD)
- [FRONT](front/README.MD)
- [MOBILE](redlion-mobile/README.MD)

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
GATEWAY_PORT=8000 docker-compose -f docker-compose.prod.yml up --build -d
```

### To launch a file on the sever :
``` BASH
scp -P [port_server] [nom_fichier] [login]@[ip_server]:[chemin_destination]
```

# Adresse de notre magnifique staging :
https://staging.redlion.bordeaux2-0921.wns.wilders.dev/

### Just to re-start the containers
``` BASH
docker-compose start
```


### Congifuration of CI : GitHub actions :
In the file
.github/workflows/pûsh.yml

We execute the test on the current branch and we execute the file ./ci-api.sh

### To obtain a dump from the database in local
docker exec -i db_redlion /bin/bash -c "PGPASSWORD=root pg_dump --username postgres postgres" > /home/avibert/Projets/Projet Alternance/dump.sql

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



## Configuration du server :

### Configuration des webhook :

Le webhook permet de recevoir des notifications et executer une commande si une notification arrive.
En pratique, un webhook réagit aux notifications envoyées sur une url (en post ou en get)

Lorsque le server percoit une notification sur cette url il lance le script prévu dans la configuration

la configuration est la suivante :

```BASH
sudo nano /etc/webhook.conf
```

```JSON
[
  {
    "id": "update",
    "execute-command": "/home/wns_student/apps/staging/fetch-and-deploy.sh",
    "command-working-directory": "/home/wns_student/apps/staging"
  }
]
```

Ici le script fetch-and-deploy l'idée c'est d'éteindre les conteneurs, pull les nouvelles images et relancer les conteneurs

```BASH
docker-compose -f docker-compose.prod.yml down && \
    docker-compose -f docker-compose.prod.yml pull && \
    GATEWAY_PORT=8000 docker-compose -f docker-compose.prod.yml up -d;
```

La configuration de l'utilitaire webhook que l'on utilise est la suivante :

```BASH
[Unit]
Description=Small server for creating HTTP endpoints (hooks)
Documentation=https://github.com/adnanh/webhook/
ConditionPathExists=/etc/webhook.conf

[Service]
User=wns_student #On précise le nom d'utilisateur
ExecStart=/usr/bin/webhook -verbose -nopanic -hooks /etc/webhook.conf  #On execute le webhook situé au webhook.conf

[Install]
WantedBy=multi-user.target
```

Pour que ça se lance au bon url on configure le caddy file :
ici l'idée c'est que le sous- : ops.redlion.bordeaux2-0921.wns.wilders.dev  est renvoyé vers le port 9000
Port qu'écoute les webhook
Et pour lancer le webhook il suffira d'aller à l'adresse :
https://ops.redlion.bordeaux2-0921.wns.wilders.dev/hooks/update
update étant l'id associé au webhook

```BASH
ops.redlion.bordeaux2-0921.wns.wilders.dev {
        reverse_proxy localhost:9000

        log {
                output file /var/log/caddy/webhook.log
        }
}
```

Pour voir les logs de webhook en live ecrire la commande :

```BASH
journalctl -f -u webhook.service
```

ne pas oublier de lancer les 2 commandes :

```BASH
# démarrer le service webhook
systemctl restart webhook

# Recharger les services
systemctl daemon-reload
```
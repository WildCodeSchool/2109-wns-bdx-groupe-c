# NOTICE

## How to start the project

<br>

### <p style='color: yellow'>/!\ Warning if you have mysql install on your computer /!\ <p>

``` BASH
sudo service mysql stop
```


### Launch the project

### The first time
``` BASH
docker-compose up --build
```

It will launch 3 container :
- `mysql`
- `front`
- `back`

### Just to re-start the containers
``` BASH
docker-compose start
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
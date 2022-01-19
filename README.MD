# NOTICE

## How to start the project

<br>

### <p style='color: yellow'>/!\ Warning if you have mysql install on your computer /!\ <p>

``` BASH
sudo service mysql stop
```


### Launch the project

``` BASH
docker-compose up --build
```

It will launch 3 container :
- `mysql`
- `front`
- `back`


### SOMETHING IS WRONG ? if something is wrong with your rights in order to write in a container  <p>

``` BASH
docker exec -it container_in_issue ash
```

In the container, for instance if you can't write in the node_modules

``` BASH
chmod -R 777 app/node_modules
```
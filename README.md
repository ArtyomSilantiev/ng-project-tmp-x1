
# First install

```bash
npm install
npx sequelize init --force
git checkout .
cp env.node.default.js env.node.js
cp env.angular.default.js env.angular.js
cp docker-compose.default.yml docker-compose.yml
cp nginx.default.conf nginx.conf
# add '127.0.0.1 app.local' to hosts 
```

* need docker docker-compose

# Run server

```bash
docker-compose up
ng serve
curl localhost:4200
```

# View docker container logs

docker logs -t -f app_nginx
docker logs -t -f app_node1
docker logs -t -f app_redis
docker logs -t -f app_postgres

# Generate migrate 

```bash
npx makemigration --preview # preview migration changes
npx makemigration # generate migration from models
```

# DB migrate

```bash
# docker-compose is up
docker exec -t -i app_node1 sh # join to js app cont
npm run migrate
npm run seed
```

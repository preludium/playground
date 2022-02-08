echo "### building api image ###"
echo
docker build --pull --rm -f "api/Dockerfile" -t preludium/todo-api:latest "api"

echo
echo "### pushing api image to registry ###"
echo
docker image push preludium/todo-api:latest

echo
echo "### building api image ###"
echo
docker build --pull --rm -f "client/Dockerfile" -t preludium/todo-client:latest "client"

echo
echo "### pushing client image to registry ###"
echo
docker image push preludium/todo-client:latest

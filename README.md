
```
# Starting the demo app. The first time will be slower as it needs to build.
# From this directory:
docker-compose up -d

# Making requests to the demo app
curl http://localhost:8080/fibonacci?order=4
{"order":4,"value":3}
curl http://localhost:8080/fibonacci?order=10
{"order":10,"value":55}

# After making code changes, you will need to force docker-compose to rebuild
# the image rather than just running the one that has already been built
docker-compose up --build -d

# Shutting down the demo app
docker-compose down
```

## Tasks

### Add Recursive Endpoint to Demo App

Currently, the API exposes an endpoint `/fibonacci` that uses an iterative
method for calculating the value of the requested order of the Fibonacci
sequence. Please extend the program to add a second endpoint:
`/recursive-fibonacci`. This endpoint should use a recursive method for
calculating the value.

### Create LRU Cache for Demo App

Create a companion app which implements a Least Recently Used (LRU) cache.
The cache app should have the following properties:

- It should be a separate program, not just another endpoint on the demo app
- It should store a maximum of 5 results in the cache
- It should implement a 'least recently used' cache eviction policy.
- If the requested sequence order is already in the cache, it should be returned
- If the requested sequence order is not in the cache then it should be fetched from
  the demo app, stored, and returned.
- It should be built and run using Docker
  - It should be built as a Docker image
  - It should be included in the docker-compose.yml file
- It should listen on port 8081
- It should expose a `/fibonacci` endpoint which caches, and proxies the results
  of the `/fibonacci` endpoint of the demo app.

The message format of the responses from the cache application should be of the form:

```
# Request:
curl http://localhost:8081/fibonacci?order=4
# Response (don't worry about indentation, this is just to make it easier to read)
{
    "fibonacci": {
        "order": 4,
        "value": 3
    },
    "cached": true (or false)
}
```

### Re-impmement the Demo App in a Language of Your Choice

Implement an app which has equivalent functionality in a language of your choice.
Your re-implementation should satisfy the following constraints:

- It should expose the same HTTP API with an identical `/fibonacci` endpoint
- It should be built and run using Docker
  - It should be built as a Docker image
  - It should be included in the docker-compose.yml file

You may also want to add the `/recursive-fibonacci` endpoint to your implementation.


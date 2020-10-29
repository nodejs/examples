# Fastify Hello World

All the code examples are compliant with the [standard](https://standardjs.com/index.html) linting style. This hello
world example goes into more detail than subsequent examples as it is intended for possible newbies.

## Instructions

Run the fastify [hello-world.js](./hello-world.js) file with nodeJS at the command line.

```shell script
node hello-world.js
```

Fastify is being configured with logging turned on and you should immediately see logs similar to

```text
{"level":30,"time":1597497138242,"pid":49826,"hostname":"mymachineName.local","msg":"Server listening at http://127.0.0.1:3000"}
{"level":30,"time":1597497138243,"pid":49826,"hostname":"mymachineName.local","msg":"server listening on 3000"}
```

## Testing

Either use [curl](https://curl.haxx.se/) on the command line

```shell script
 curl http://localhost:3000
```

or paste this into the browser of your choice

```shell script
http://localhost:3000/
```

you should get the hello world response. The server is responding on the root path with a JSON object

```json
{
   "hello": "world"
}
```

The format of response will vary depending on your browser and installed plugins.

## Description

Lets look at what is going on here.

```javascript
// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.listen(APP_PORT)
```

**Fastify** is required into the application and called immediately with a configuration object. The object sets fastify's
logging to true.

```javascript
const fastify = require('fastify')({ logger: true })
```

This could equally be written as

```javascript
const fastifyServer = require('fastify');
const fastify = fastifyServer({
  logger: true
})
```

The next thing is a **route** is declared.

```javascript
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})
```

This is adding a route to base path '/' that will handle **get** requests on that path. The handling function takes two arguements.
These are [request](https://www.fastify.io/docs/latest/Request/) and [reply](https://www.fastify.io/docs/latest/Reply/).
Note that the reply object is simply returned and that the handling function is declared as **async**

Lets see how the server is being started

```javascript
fastify.listen(APP_PORT)
```

The **listen** function is called upon fastify and provided with a port number and a callback.

## Hello World, with an asynchronous response

The hello-world.js example responded synchronously but what if the reply could not be made synchronously and depended
on other asynchronous services.
To simulate an asynchronous response the [hello-world-async.js](./hello-world-async.js) route uses a timer with a 2
seconds timeout.

```javascript
fastify.get('/', async (request, reply) => {
  await setTimeoutPromise(2000)
  reply.send({
    "hello": "world"
  })
})
```

Whats going on here? The route handler sets a timer to simulate asynchronous behavior. In addition the call to fastify
is provided with no callback. When no callback is given fastify returns a promise. We are now starting fastify within an
asynchronous function.

```javascript

// Run the server!
const start = async () => {
  try {
    // if no callback is give a promise is returned
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
```

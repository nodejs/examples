# Fastify Session

A common use case for a web framework is to provide session storage. Fastify has a [concept of plugins](https://www.fastify.io/docs/latest/Plugins-Guide/)
and the plugin for session is [fastify-session](https://github.com/SerayaEryn/fastify-session). These examples
will demonstrate server side session storage. 

## Simple local http session demonstration using local storage 

[http-session-server](./http-session-server/http-session-server.js)

The most simple demonstration is an http server using a memory store. A memory store would be a local nodeJS based
storage mechanism. This demonstrates the concept of
session in fastify but is not what you would want in production. You would want to use an https server and
you would want to use a network based storage mechanism. In order to scale your NodeJS based servers you
would need to share the session storage between multiple instances of the same program so that any particular
cookied request would find its own session.

In this example in adddition to requiring fastify there are two additional modules being required. These are 

- [fastify-session](https://www.npmjs.com/package/fastify-session)
- [fastify-cookie](https://www.npmjs.com/package/fastify-cookie)

The fastify cookie plugin will add support to read and set cookie headers. The fastify session plugin provides session
based storage on the localhost.


## Simple local https session demonstration using local storage

[https-session-server](./https-session-server/https-session-server.js)

Another simple demonstration is the use of https on your local machine using local nodeJS based storage. In order to
start **fastify** as an https server it is necessary to provide certificates. Localhost certificates have been provided
to save the user the difficulty of creating one. This is a command to create certificates.

```shell script
penssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt -subj "/CN=localhost"
```

The key and cert are created using [openssl](https://www.openssl.org/) and were created on a linux ubuntu system. The
commands are similar for osx.

## Local https session using redis

[https-session-server-redis](./https-session-server-redis/https-session-server-redis.js)

A more realistic example of creating a session on fastify would involve using a network based store. This would allow
multiple instances fastify to access the session data when a cookie is sent.
In order to run this you either have to have a local [redis](https://redislabs.com/get-started-with-redis/) running or 
use docker. If you have [docker](https://www.docker.com/products/docker-desktop) installed then can simple bring the
service up

```shell script
docker-compose up 
```

The server will be running on port 3000 and the session will be stored in the redis cache.

Each time you hit the url the response will tell you how many times you requested this URL.

```json
{
"hello": "route requested 6 times in this session"
}
```

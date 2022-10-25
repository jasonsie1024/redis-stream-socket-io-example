# Example use of Redis Streams as message broker

Run `docker compose up` or `docker-compose up` to run this example code.

## Redis Stream

Redis stream can be view as a sort of append-only log, allowing multiple clients adding new records to it and setup consumer groups to read non-repeating records from it. For more informations about Redis Stream, read the [official tutorial](https://redis.io/docs/data-types/streams-tutorial/).

## Architecture

* Backend
    - Backend act as producers, adding new location records into redis streams
* RTS
    - RTS act as consumers, listening and read new records from redis streams

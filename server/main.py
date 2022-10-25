from random import random, randrange, randbytes
from time import sleep
import redis, json

r = redis.Redis('redis', 6379)
try:
    r.xgroup_create('locations', 'rts', '$', True)
except:
    pass

while True:
    data = {
        'user': randbytes(6).hex(),
        'longitude': round(random(), 6),
        'latitude': round(random(), 6),
    }

    r.xadd('locations', {
        'data': json.dumps(data)
    }, '*')
    sleep(1)
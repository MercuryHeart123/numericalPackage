#!/bin/bash
mongoimport --host localhost --db numerical --collection users --authenticationDatabase admin --username root --password example --file /docker-entrypoint-initdb.d/users.json --jsonArray
mongoimport --host localhost --db numerical --collection methods --authenticationDatabase admin --username root --password example --file /docker-entrypoint-initdb.d/methods.json --jsonArray
mongosh --username root --password example --authenticationDatabase admin <<EOF
use numerical
db.createUser({
    user: "admin",
    pwd: "1234",
    roles: [ { role: "readWrite", db: "numerical" } ]
});
EOF

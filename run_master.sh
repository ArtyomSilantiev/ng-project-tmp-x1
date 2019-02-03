#!/bin/bash
echo "Hello!!!"
echo "Run npm migrate"
npm run migrate
echo "Run npm seed"
npm run seed
echo "Run nodemon server"
npx nodemon server

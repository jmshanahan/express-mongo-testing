# Introduction

A variation of Stephen Grider's The Complete Developers Guide to MongoDB.

Included are testing with Mocha / Chai

I have modified the way it is set out using the express Router
Business logic has been seperated into a controllers file.

Provides a good template for setting out an express application.
The app.js is seperated from the index.js
App.js is used in testing and therefore there is no listeniner activated while testing.

Note it uses envoronment variables set in the package.json file

- NODE_ENV=test
- NODE_PATH=./src

# Backend for Mesto
### Version v1.0.1
### It's the backend for working with the database.
### With my Backend you can get information about users and cards with photo, which users added.
## What i used:
### HTML, CSS, JS, Webpack, NODE.JS, NPM, EXPRESS.JS, Mongoose, Mongo, Eslint
## How to use (instruction for terminal):
## 1) Install NODE.JS;
## 2) Make clone of repository: git clone https://github.com/sokolik90/mesto-database.git;
## 3) Install NPM: npm install;
## 4) Install Express.js: npm install express --save;
### For use command (starts the app on the local server: localhost:3000):
## npm run start;
### For development use (with hot reload) command:
### npm run dev.
## Address of database Mongoose: mongodb://localhost:27017/mydb
## Address of my website: mesto-safety.tk
## Requests that you can use:
### GET localhost:3000/users (mesto-safety.tk/users) - return JSON with information about all users;
### GET localhost:3000/users/id (mesto-safety.tk/users/id) - return information about user, which id you enter;
### POST localhost:3000/users (mesto-safety.tk/users) - create new user from your sent JSON file, which should be has 3 categories: name, about, avatar (exam: {"name": "name", "about": "about", "avatar": "link"});
### GET localhost:3000/cards (mesto-safety.tk/cards) - return JSON with information about all cards and owners of cards;
### POST localhost:3000/cards (mesto-safety.tk/cards) - create new user from your sent JSON file, which should be has 2 categories: name, link (exam: {"name": "name", "link": "link"}), the "owner" automatically added;
### DELETE localhost:3000/cards/id (mesto-safety.tk/cards/id) - delete card which id you entered and return JSON with deleted card;

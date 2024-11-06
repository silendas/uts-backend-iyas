const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');
require('dotenv').config();

const firebaseConfig = {
  databaseURL: process.env.FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = db; 
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Inicializa Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfe0kSUD_YdWTFS0qv0s6BFIVJb7jQcBI",
  authDomain: "to-do-58990.firebaseapp.com",
  databaseURL: "https://to-do-58990-default-rtdb.firebaseio.com",
  projectId: "to-do-58990",
  storageBucket: "to-do-58990.appspot.com",
  messagingSenderId: "354435112717",
  appId: "1:354435112717:web:062fe6f74c6ca5f7ff9a44"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;

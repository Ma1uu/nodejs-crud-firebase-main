// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQ0aiuBdlvIaVGzNuMIh0_WXi3xs5hG50",
  authDomain: "jquery-beb6a.firebaseapp.com",
  databaseURL: "https://jquery-beb6a-default-rtdb.firebaseio.com",
  projectId: "jquery-beb6a",
  storageBucket: "jquery-beb6a.firebasestorage.app",
  messagingSenderId: "128076453178",
  appId: "1:128076453178:web:cf4faddb74259a0204ec03",
  measurementId: "G-FFWQZ2F6H3"
};

// Evita reinicialização em hot-reload (nodemon)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);
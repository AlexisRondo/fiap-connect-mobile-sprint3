// Config do firebase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqjS528VvQytFKn55LiSluDqtAY1J0Alw",
  authDomain: "fiap-connect.firebaseapp.com",
  projectId: "fiap-connect",
  storageBucket: "fiap-connect.firebasestorage.app",
  messagingSenderId: "16628777388",
  appId: "1:16628777388:web:de50ec5f39d01661a7ba09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
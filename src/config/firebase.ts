// Config do Firebase com persistencia de sessao via AsyncStorage
import { initializeApp } from "firebase/app";
// O TypeScript do Firebase v12 nao exporta o tipo getReactNativePersistence
// mas a funcao existe em runtime no bundle React Native do SDK.
// Bug conhecido: github.com/firebase/firebase-js-sdk/issues/9316
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqjS528VvQytFKn55LiSluDqtAY1J0Alw",
  authDomain: "fiap-connect.firebaseapp.com",
  projectId: "fiap-connect",
  storageBucket: "fiap-connect.firebasestorage.app",
  messagingSenderId: "16628777388",
  appId: "1:16628777388:web:de50ec5f39d01661a7ba09",
};

const app = initializeApp(firebaseConfig);

// initializeAuth com persistencia, no lugar de getAuth simples
// Se o usuario fechar o app, a sessao continua salva no AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
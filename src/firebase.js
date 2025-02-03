// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.FCM_API_KEY,
  authDomain: import.meta.env.FCM_AUTH_DOMAIN,
  projectId: import.meta.env.FCM_PROJECT_ID,
  storageBucket: import.meta.env.FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.FCM_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { firebaseApp, messaging, getToken };

// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlkypDElllf_zXCMFiHCGNO1bX2XaGHto",
  authDomain: "personalized-dashboard-c2503.firebaseapp.com",
  projectId: "personalized-dashboard-c2503",
  appId: "1:436550627038:web:86c71351cc086533425c4f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

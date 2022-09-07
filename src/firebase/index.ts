import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  Auth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";

import app from "./firebase-config";
import { authStateObserver } from "../redux/store";

export const auth = getAuth(app);

export const db = getFirestore(app);

export async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function signOutUser() {
  await signOut(auth);
}

export function initFirebaseAuth() {
  onAuthStateChanged(auth, authStateObserver);
}

export function getUserName() {
  return auth.currentUser?.displayName;
}

export function isUserSignedIn() {
  return !!auth.currentUser;
}

export function getUserId() {
  return auth.currentUser?.uid;
}

export function getUser() {
  return auth.currentUser;
}

initFirebaseAuth();

const analytics = getAnalytics(app);


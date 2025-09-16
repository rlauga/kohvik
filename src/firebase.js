// firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// MENÜÜ lugemine
export async function fetchMenu(cafeId){
  const snap = await getDoc(doc(db, 'menus', cafeId));
  if(!snap.exists()) throw new Error('Menüü puudub');
  return snap.data(); // { categories: [...], items: [...] } vms
}

// TELLIMUSE salvestus (avalik)
export async function createOrder(cafeId, {items, total, note, lang}) {
  const ref = collection(db, 'orders', cafeId, 'orders');
  return addDoc(ref, {
    cafeId,
    items,
    total,
    note: note || '',
    lang: lang || 'et',
    status: 'new',
    createdAt: serverTimestamp(),
  });
}

// ADMIN – reaalajas tellimuste vaade
export function subscribeOrders(cafeId, cb){
  const q = query(collection(db, 'orders', cafeId, 'orders'), orderBy('createdAt','desc'));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}
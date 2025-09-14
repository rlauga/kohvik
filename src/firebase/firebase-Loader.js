// src/firebase/firebase-loader.js
import dbKohvikRlaugas from './firebase-kohvik-rlauga';
// impordi teised kui olemas: firebase-johvi.js jne

import { getCafeIdFromUrl } from '../utils/getCafeId';

const cafes = {
  'kohvik-rlauga': dbKohvikRlaugas,
  // 'kohvik-johvi': dbJohvi,
};

export const getFirebaseDB = () => {
  const cafeId = getCafeIdFromUrl();
  return cafes[cafeId] || null;
};
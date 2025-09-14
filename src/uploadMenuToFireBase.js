// src/uploadMenuToFirebase.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase-kohvik-rlauga'; // ← muuda kohviku järgi
import menuItems from './menuitems'; // ← sinu kohviku menu

const uploadMenu = async () => {
  try {
    for (const item of menuItems) {
      await addDoc(collection(db, 'menu'), item);
      console.log('Lisati:', item.name.et);
    }
    console.log('✅ Kõik menüüelemendid lisatud Firebase’i!');
  } catch (error) {
    console.error('❌ Viga menüü üleslaadimisel:', error);
  }
};

uploadMenu();
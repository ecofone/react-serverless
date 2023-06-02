import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";

export const FireStore = {
  readDocs: (...args) => {
    let docs = [];
    const [collectionName] = args;
    return new Promise(async (resolve) => {
      try {
        const ref = collection(db, collectionName);
        const snapshots = await getDocs(ref);
        snapshots.forEach((doc) => {
          docs.push({ ...doc.data() });
        });
        resolve(docs);
      } catch (e) {
        console.error(e);
      }
    });
  },
  writeDoc: (...args) => {
    const [inputs, collectionName] = args;
    return new Promise(async (resolve) => {
      const index = Math.floor(Math.random() * 1000000000);
      try {
        const docRef = doc(db, collectionName, `${index}`);
        await setDoc(docRef, {
          title: inputs.title,
          path: inputs.path,
          createdAt: serverTimestamp(),
        });
        resolve("Successfully Inserted");
      } catch (e) {
        console.error(e);
      }
    });
  },
};

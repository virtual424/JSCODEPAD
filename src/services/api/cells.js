import { db } from "../../firebase";
import {
  setDoc,
  doc,
  collection,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

const cells = {
  createWork: async (workName, uid) => {
    try {
      const response = await setDoc(doc(db, "users", uid, "works", workName), {
        order: [],
        data: null,
      });
      return response;
    } catch (e) {
      throw e;
    }
  },

  saveCells: async (payload) => {
    try {
      const { order, data, workName, uid } = payload;

      const response = await setDoc(doc(db, "users", uid, "works", workName), {
        order,
        data,
      });
      return response;
    } catch (e) {
      throw e;
    }
  },

  getAllWorkNames: (uid, callback) =>
    new Promise((resolve, reject) => {
      const workRef = collection(db, `users/${uid}/works`);
      onSnapshot(
        workRef,
        (snapshot) => {
          let workList = [];
          if (snapshot) {
            snapshot.forEach((doc) => {
              workList.push({ name: doc.id });
            });
          }
          callback(workList);
          // resolve(cartList);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    }),

  fetchCells: async ({ uid, workName }) => {
    try {
      const workRef = doc(db, `users/${uid}/works/${workName}`);
      const docSnap = await getDoc(workRef);
      return docSnap;
    } catch (e) {
      throw e;
    }
  },
};

export default cells;

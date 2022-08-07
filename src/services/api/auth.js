import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const authApi = {
  signUp: async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return response;
    } catch (e) {
      throw e;
    }
  },
  signIn: async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (e) {
      throw e;
    }
  },
  signOut: async () => {
    try {
      const response = await signOut(auth);
      return response;
    } catch (e) {
      throw e;
    }
  },

  saveUser: async (user) => {
    try {
      const response = await setDoc(doc(db, "users", user.uid), user);
      return response;
    } catch (e) {
      throw e;
    }
  },

  getUser: async (id) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", id));
      const querySnapshot = await getDocs(q);
      let data = null;
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
      }
      return data;
    } catch (e) {
      throw e;
    }
  },
};

export default authApi;

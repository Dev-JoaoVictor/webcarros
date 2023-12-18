import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYqadPSZrPWdOXjMnfepmgid7ZTp7Pcdg",
  authDomain: "webcarros-bbb3f.firebaseapp.com",
  projectId: "webcarros-bbb3f",
  storageBucket: "webcarros-bbb3f.appspot.com",
  messagingSenderId: "1004655977540",
  appId: "1:1004655977540:web:45bffb21af314b2fa00811",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };

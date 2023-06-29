import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'russo-trip.firebaseapp.com',
  projectId: 'russo-trip',
  storageBucket: 'russo-trip.appspot.com',
  messagingSenderId: '493943409370',
  appId: '1:493943409370:web:7ec3da17002b128e7d73e3',
};

initializeApp(firebaseConfig);

export const db = getFirestore();

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error: any) {
      toast.error('error creating the user', error.message);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
  // if user data didnt exist
  // create/set the document with the data from userAuth in my collection

  // if user data exist
  // return userDocRef
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onNameChangeSubmit = async (currentUser: User, name: string) => {
  try {
    if (currentUser.displayName !== name) {
      await updateProfile(currentUser, {
        displayName: name,
      });

      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        name,
      });
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const updateAuthProfile = (displayName: string) =>
  updateProfile(auth.currentUser!, { displayName });

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const onSignOut = async () => {
  try {
    auth.signOut();
  } catch (error: any) {
    toast.error(error.message);
  }
};

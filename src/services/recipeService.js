import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

// Save a recipe
export const addRecipe = async (recipe) => {
  return await addDoc(collection(db, "recipes"), {
    ...recipe,
    favorite: false,
    createdAt: serverTimestamp(),
  });
};

// Get all recipes
export const getRecipes = async () => {
  const snapshot = await getDocs(collection(db, "recipes"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Toggle favorite
export const toggleFavorite = async (id, favorite) => {
  await updateDoc(doc(db, "recipes", id), {
    favorite: !favorite,
  });
};

// Delete recipe
export const deleteRecipe = async (id) => {
  await deleteDoc(doc(db, "recipes", id));
};
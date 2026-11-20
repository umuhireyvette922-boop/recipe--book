import { useState,useEffect } from "react";
import { getRecipes } from "../services/recipeService";

function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error loading recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    (recipe.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return {
    recipes,
    setRecipes,
    search,
    setSearch,
    filteredRecipes,
    loading,
  };
}

export default useRecipes;
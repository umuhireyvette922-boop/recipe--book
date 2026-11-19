import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../services/recipeService";
import Header from "../component/Header";

function AddRecipe() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addRecipe({
        name,
        image,
        ingredients: ingredients
          .split("\n")
          .filter((item) => item.trim() !== ""),
        steps: steps
          .split("\n")
          .filter((item) => item.trim() !== ""),
      });

      alert("Recipe saved successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to save recipe");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <Header />
      <main className="form-shell">
      <form
        className="recipe-form"
        onSubmit={handleSubmit}
      >
        <p className="eyebrow">From my kitchen</p>
        <h1>Add a new recipe</h1>
        <p className="form-intro">Save the ingredients and method so they are ready whenever you cook.</p>

        <label>Recipe name</label>
        <input
          type="text"
          placeholder="Recipe name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />

        <label>Image URL</label>
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="form-input"
        />

        <label>Ingredients</label>
        <textarea
          placeholder={"Ingredients (one per line)\n2 eggs\n1 cup flour"}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          rows="5"
          className="form-input"
        />

        <label>Preparation steps</label>
        <textarea
          placeholder={"Preparation steps (one per line)\nMix ingredients\nCook in a pan"}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
          rows="6"
          className="form-input"
        />

        <button
          type="submit"
          className="primary-button"
        >
          Save Recipe
        </button>
      </form>
      </main>
    </div>
  );
}

export default AddRecipe;
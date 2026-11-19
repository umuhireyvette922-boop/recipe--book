import useRecipes from "../Hook/useRecipes";
import { toggleFavorite } from "../services/recipeService";
import Header from "../component/Header";

function Favorites() {
  const { recipes, setRecipes, loading } = useRecipes();

  const favoriteRecipes = recipes.filter((recipe) => recipe.favorite);

  const removeFavorite = async (recipe) => {
    try {
      await toggleFavorite(recipe.id, recipe.favorite);

      setRecipes((prev) =>
        prev.map((item) =>
          item.id === recipe.id
            ? { ...item, favorite: !item.favorite }
            : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf3]">
        <Header />
        <main className="page-shell">
          <p>Loading favorites...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#fffaf3] min-h-screen">
      <Header />
      <main className="page-shell">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Saved for later</p>
            <h1>Favorite recipes</h1>
          </div>
          <span className="recipe-count">
            {favoriteRecipes.length} {favoriteRecipes.length === 1 ? "recipe" : "recipes"}
          </span>
        </div>

      <div className="recipe-grid">
        {favoriteRecipes.map((recipe) => (
          <article key={recipe.id} className="recipe-card compact-card">
            <div className="recipe-image-wrap">
            <img
              src={recipe.image || "https://placehold.co/800x600/f5eee3/a66a45?text=Recipe"}
              alt={recipe.name}
              className="recipe-image"
            />
            <button
              onClick={() => removeFavorite(recipe)}
              className="favorite-button is-favorite"
              aria-label={`Remove ${recipe.name} from favorites`}
            >
              <span aria-hidden="true">♥</span>
            </button>
            </div>
            <div className="recipe-content">
              <h2>{recipe.name}</h2>
            </div>
          </article>
        ))}
      </div>

      {favoriteRecipes.length === 0 && (
        <p className="mt-5">You have no favorite recipes yet.</p>
      )}
      </main>
    </div>
  );
}

export default Favorites;
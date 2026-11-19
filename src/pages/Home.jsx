import useRecipes from "../Hook/useRecipes";
import { toggleFavorite } from "../services/recipeService";
import Header from "../component/Header";

function Home() {
  const {
    setRecipes,
    search,
    setSearch,
    filteredRecipes,
    loading,
  } = useRecipes();

  const handleFavorite = async (recipe) => {
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
          <div className="page-heading">
            <div>
              <p className="eyebrow">My kitchen</p>
              <h1>My recipe collection</h1>
            </div>
          </div>
          <div className="recipe-grid">
            {[1, 2, 3].map((item) => (
              <div className="recipe-card skeleton-card" key={item}>
                <div className="skeleton skeleton-image" />
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-line" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <Header />

      <main className="page-shell">
        <div className="page-heading">
          <div>
            <p className="eyebrow">My kitchen</p>
            <h1>My recipe collection</h1>
          </div>
          <span className="recipe-count">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"}
          </span>
        </div>

        <div className="search-wrap">
          <span aria-hidden="true" className="search-icon">⌕</span>
          <input
            type="search"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search recipes"
          />
        </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <article key={recipe.id} className="recipe-card">
            <div className="recipe-image-wrap">
            <img
              src={recipe.image || "https://placehold.co/800x600/f5eee3/a66a45?text=Recipe"}
              alt={recipe.name}
              className="recipe-image"
            />
            <button
              onClick={() => handleFavorite(recipe)}
              className={`favorite-button ${recipe.favorite ? "is-favorite" : ""}`}
              aria-label={recipe.favorite ? `Remove ${recipe.name} from favorites` : `Add ${recipe.name} to favorites`}
            >
              <span aria-hidden="true">{recipe.favorite ? "♥" : "♡"}</span>
            </button>
            </div>

            <div className="recipe-content">
              <h2>{recipe.name}</h2>
              <div className="recipe-details">
                <div>
                  <h3>Ingredients</h3>
                  <ul>
                    {recipe.ingredients?.slice(0, 4).map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Method</h3>
                  <ol>
                    {recipe.steps?.slice(0, 3).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="empty-state">
          <span aria-hidden="true">🍽</span>
          <h2>No recipes found</h2>
          <p>Try a different search or add a new recipe.</p>
        </div>
      )}
      </main>
    </div>
  );
}

export default Home;
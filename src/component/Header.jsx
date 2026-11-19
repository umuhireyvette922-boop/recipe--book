import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Recipe Book home">
        <span className="brand-mark">R</span>
        <span>Recipe Book</span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Recipes</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>

      <Link to="/add-recipe" className="add-button">
        <span aria-hidden="true">+</span>
        Add recipe
      </Link>
      <Link to="/login" className="account-button" aria-label="Sign in">
        <span aria-hidden="true">●</span>
      </Link>
    </header>
  );
}

export default Header;
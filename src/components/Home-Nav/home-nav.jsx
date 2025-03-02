import AddRecipeModal from "../../pages/Homepage/add-recipe-modal";
import "./home-nav.css";

export default function HomeNav(props) {
  const { searchContent, handleSearch } = props;
  function handleChange(e) {
    const { value } = e.target;
    searchContent.current = value;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary home-nav-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ fontWeight: "bold" }}>
          Epic Eats
        </a>
        <AddRecipeModal />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Actions
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    Add Recipe
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" href="#">
                    Favorites
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" href="#">
                    Today&apos;s Special
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Go
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ loginVisible = false }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary nav-custom-style">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
            style={{ fontWeight: "normal", fontSize: "1.5rem" }}
          >
            Epic Eats
          </a>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex" role="search">
              {loginVisible && (
                <Link to={"/login"}>
                  <button className="btn btn-outline-info" type="submit">
                    Login
                  </button>
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

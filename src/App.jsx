import Navbar from "./components/Navbar/navbar";
import "./App.css";
import Toast from "./components/Toast/toast";
import { Link } from "react-router-dom";
import ErrorBoundary from "./components/Error-Boundary/error-boundary";

export default function App() {
  return (
    <ErrorBoundary>
      <div className="main-app appear-animation">
        <Toast />
        <Navbar loginVisible={true} bg={"transparent"} />
        <main className="main-component">
          <div className="inner-main">
            <h1>Share & Discover Recipes</h1>
            <p>
              <span
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                }}
              >
                Epic Eats
              </span>{" "}
              is a community-driven platform where food lovers can explore,
              create, and share recipes. Upload your own, browse diverse
              cuisines, and connect with fellow cooks. Start your culinary
              journey today.
            </p>
            <Link to={"/signup"}>
              <button
                className="btn btn-primary"
                style={{ padding: "7px 20px" }}
              >
                Signup
              </button>
            </Link>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

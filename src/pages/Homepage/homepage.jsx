import { useCallback, useContext, useEffect, useRef, useState } from "react";
import HomeNav from "../../components/Home-Nav/home-nav";
import Toast from "../../components/Toast/toast";
import { useNavigate } from "react-router-dom";
import { executeToast } from "../../utils/execute-toast";
import "./homepage.css";
import RecipeCardPlaceholder from "./card-placeholder";
import axios from "axios";
import RecipeDetailDialog from "./recipe-dialog/recipe-detail-dialog";
import { UserContext } from "../../contexts/user-phone-context";

const CardLayout = ({ data }) => {
  const { _id, title, imageUrl, description } = data;

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt="Pizza image" />
      <RecipeDetailDialog data={data} modalId={`recipe-detail-${_id}`} />
      <div className="details">
        <h2>{title ? title : "Sample Name"}</h2>
        <p style={{ fontSize: "0.85rem" }}>{description}</p>
        <div className="footer">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#recipe-detail-${_id}`}
          >
            Get Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Homepage() {
  const searchContent = useRef("");
  const navigate = useNavigate();

  const { setUserPhone } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getFilteredItems = async () => {
    try {
      const completeUrl = backendUrl + "recipe/getbyname";
      const response = await axios.post(completeUrl, {
        item: searchContent.current,
      });

      const { status, data } = response;
      const { recipes: filteredRecipes } = data;
      console.log("Filtered items:", filteredRecipes);
      if (status === 200 && filteredRecipes) {
        return filteredRecipes;
      }
    } catch (error) {
      console.log("Eroor:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchContent.current) return;
    executeToast({
      title: "Form submitted",
      content: "To go back to homepage just refresh",
    });
    const items = await getFilteredItems();
    setRecipes(items);
    searchContent.current = "";
  };

  const getAllRecipes = useCallback(async () => {
    setIsLoading(true);
    async function perform() {
      try {
        const completeUrl = import.meta.env.VITE_BACKEND_URL + "recipe/all";
        const response = await axios.get(completeUrl);
        if (response.status === 200) {
          const { recipes: recps } = response.data;
          setRecipes(recps);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    await perform();
  }, []);

  const isAlreadyLoggedIn = useCallback(async () => {
    async function perform() {
      let token;
      if (localStorage) {
        token = localStorage.getItem("token");
      }
      if (!token) {
        navigate("/login", { replace: true });
      }
      try {
        const completeUrl = backendUrl + "protected-route";
        const response = await axios.post(completeUrl, { token: token });

        const { status, data } = response;
        const { phone } = data;
        setUserPhone(phone);

        if (status === 200) {
          navigate("/home", { replace: true });
        }
      } catch (error) {
        console.log("Auth error:", error);
      }
    }
    await perform();
  }, [backendUrl, navigate, setUserPhone]);

  useEffect(() => {
    setTimeout(() => {
      isAlreadyLoggedIn().then(() => {
        getAllRecipes();
      });
    }, 2000);
  }, [getAllRecipes, isAlreadyLoggedIn]);

  return (
    <div className="homepage">
      <HomeNav searchContent={searchContent} handleSearch={handleSearch} />
      <RecipeDetailDialog />
      <Toast position="bottom-0 end-0" />
      <div className="home-main-component">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <RecipeCardPlaceholder key={idx} />
            ))}
          </>
        ) : recipes.length > 0 ? (
          <>
            {recipes.map((item, idx) => {
              return <CardLayout key={idx} data={item} />;
            })}
          </>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

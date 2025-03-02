import { useEffect, useState } from "react";
import "./recipe-detail.dialog.css";
import axios from "axios";

const FavoriteDialog = () => {
  const [recipes, setRecipes] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getFavoriteRecipes = async () => {
    const perform = async () => {
      try {
        const completeUrl = backendUrl + "/recipe/favorites";
        const response = await axios.get(completeUrl);

        const { status, data } = response;
        const { favorites } = data;

        if (status === 200) {
          setRecipes(favorites);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    await perform();
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <div
      className="modal fade"
      id="favorite-dialog"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Recipe
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body recipe-container-body"></div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save to favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteDialog;

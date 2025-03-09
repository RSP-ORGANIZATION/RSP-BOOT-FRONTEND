import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import "./favorite-dialog.css";
import { UserContext } from "../../../contexts/user-phone-context";
import RecipeDetailDialog from "../recipe-dialog/recipe-detail-dialog";

const FavoriteDialog = () => {
  const [recipes, setRecipes] = useState([]);
  const { userPhone } = useContext(UserContext);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getFavoriteRecipes = useCallback(async () => {
    const perform = async () => {
      try {
        const completeUrl = backendUrl + "recipe/favorites/all";
        const response = await axios.post(completeUrl, {
          userPhone: userPhone,
        });

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
  }, [backendUrl, userPhone]);

  function handleCurrentModalClose(recipeId) {
    const firstModalEl = document.getElementById("favorite-dialog");
    const firstModal = bootstrap.Modal.getInstance(firstModalEl);

    if (firstModal) {
      // Listen for the modal close event once
      firstModalEl.addEventListener(
        "hidden.bs.modal",
        function onFirstModalHidden() {
          firstModalEl.removeEventListener(
            "hidden.bs.modal",
            onFirstModalHidden
          );
          openSecondModal(recipeId);
        },
        { once: true } // Ensures it runs only once
      );

      // Close the first modal
      firstModal.hide();
    } else {
      openSecondModal(recipeId);
    }
  }

  function openSecondModal(recipeId) {
    const secondModalEl = document.getElementById(recipeId);

    if (secondModalEl) {
      setTimeout(() => {
        const secondModal = new bootstrap.Modal(secondModalEl, {
          backdrop: "static",
          keyboard: false,
        });

        secondModal.show();
      }, 100); // Slight delay to avoid conflicts
    } else {
      console.error(`Modal with ID ${recipeId} not found.`);
    }
  }

  useEffect(() => {
    getFavoriteRecipes();
  }, [getFavoriteRecipes]);

  return (
    <div
      className="modal fade"
      id="favorite-dialog"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Favorites
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body recipe-container-body">
            <div className="favorite-main-container">
              {recipes?.map(({ _id, title, description, imageUrl }, idx) => (
                <div className="favorite-container" key={_id}>
                  <img src={imageUrl} alt="No Image" />
                  <RecipeDetailDialog
                    modalId={`favorite-recipe-dialog-${idx}`}
                    data={recipes[idx]}
                  />
                  <div className="favorite-container-details">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    {/* <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleCurrentModalClose(`favorite-recipe-dialog-${idx}`)
                      }
                      disabled
                    >
                      <i
                        className="fa-solid fa-arrow-right"
                        style={{ textDecoration: "line-through" }}
                      ></i>
                    </button> */}
                  </div>
                </div>
              ))}
              <p>
                Note: Currently you can only save recipes to favorites but cannot
                navigate from here. (Will be fixed in future)
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button className="btn btn-dark" onClick={getFavoriteRecipes}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteDialog;

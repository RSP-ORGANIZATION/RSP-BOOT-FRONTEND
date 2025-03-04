import axios from "axios";
import { executeToast } from "../../utils/execute-toast";
import { useEffect, useRef, useState } from "react";

const AddRecipeModal = () => {
  const bodyRef = useRef();
  const [recipe, setRecipe] = useState({
    title: "",
    steps: [""],
    ingredients: [{ name: "", quantity: "" }],
    imageUrl: "",
    description: "",
  });

  function handleAddIngredients() {
    const ingredients = [...recipe.ingredients];
    ingredients.push({ name: "", quantity: "" });
    setRecipe({ ...recipe, ingredients: ingredients });
  }

  function handleDeleteIngredients() {
    if (recipe.ingredients.length === 1) return;
    const ingredients = [...recipe.ingredients];
    ingredients.pop();
    setRecipe({ ...recipe, ingredients: ingredients });
  }

  function handleIngredientChange(e, index) {
    const { name, value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index][name] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  }

  function handleAddSteps() {
    if (recipe.steps.length <= 9) {
      const steps = recipe.steps;
      steps.push("");
      setRecipe((prev) => {
        return {
          ...prev,
          steps: steps,
        };
      });
      setTimeout(() => {
        bodyRef.current.scrollTo({
          top: bodyRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    } else {
      executeToast({
        title: "Stop",
        content: "Maximum steps reached",
      });
    }
  }

  function handleStepChange(e, index) {
    const steps = recipe.steps;
    const { value } = e.target;
    steps[index] = value;
    setRecipe({ ...recipe, steps: steps });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function addRecipeToDB(e) {
    e.preventDefault();
    alert("Wow");
    async function sendAddRequest() {
      try {
        const completeUrl = import.meta.env.VITE_BACKEND_URL + "recipe/add";
        const response = await axios.post(completeUrl, recipe);
        if (response.status === 200) {
          executeToast({
            title: "Recipe uploaded",
            content: "Refresh the page to see the recipe",
          });
        }
      } catch (error) {
        if (error?.response) {
          const { status } = error.response;
          if (status === 500) {
            executeToast({
              title: "Something went wrong",
              content: "Try again later.",
            });
          }
        }
      }
    }
    await sendAddRequest();
  }

  useEffect(() => {
    console.log(JSON.stringify(recipe, null, 2));
  }, [recipe]);

  return (
    <div
      className="modal fade"
      id="add-recipe-modal"
      tabIndex="-1"
      aria-labelledby="add-recipe-modal-label"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="add-recipe-modal-label">
              Add Recipe
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body form-body" ref={bodyRef}>
            <form onSubmit={addRecipeToDB}>
              <div className="mb-3">
                <label htmlFor="recipe-title" className="col-form-label">
                  Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recipe-title"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="recipe-desc" className="col-form-label">
                  Description:
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="recipe-desc"
                  name="description"
                  onChange={handleChange}
                  placeholder="Describe your recipe"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="recipe-image-url">Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="recipe-image-url"
                  name="imageUrl"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 ingredients-container">
                <label style={{ gridColumn: "span 2" }}>Ingredients:</label>
                {recipe.ingredients.map((obj, idx) => {
                  return (
                    <div
                      key={idx}
                      className="d-flex gap-2"
                      style={{ gridColumn: "span 2" }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => handleIngredientChange(e, idx)}
                        name="name"
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quantity"
                        onChange={(e) => handleIngredientChange(e, idx)}
                        name="quantity"
                      />
                    </div>
                  );
                })}
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleAddIngredients}
                >
                  Add Ingredients
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={handleDeleteIngredients}
                >
                  Delete Ingredients
                </button>
              </div>
              <div className="mb-3 steps-parent">
                <label htmlFor="message-text" className="col-form-label">
                  Steps:
                </label>
                <div className="outer-steps">
                  {recipe.steps.map((obj, idx) => {
                    return (
                      <div key={idx} className="steps-container">
                        <section>{idx + 1}</section>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => handleStepChange(e, idx)}
                        />
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-primary add-step"
                  type="button"
                  onClick={() => handleAddSteps()}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "var(--primary-button-background)",
                border: "none",
              }}
              onClick={addRecipeToDB}
            >
              Add Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeModal;

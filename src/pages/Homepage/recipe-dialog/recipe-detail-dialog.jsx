import "./recipe-detail.dialog.css";

const RecipeDetailDialog = ({ data = {}, modalId }) => {
  const { _id, title, description, steps, imageUrl, ingredients } = data;

  const handleFavoriteAction = () => {};

  return (
    <div
      className="modal fade"
      id={modalId}
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
          <div className="modal-body recipe-container-body">
            <div className="recipe-detail-img-container">
              <img src={imageUrl} alt="" />
            </div>
            <h2 style={{ marginBottom: "2px" }}>{title}</h2>
            <p>{description}</p>
            <div className="mb-3">
              <h5>Ingredients: </h5>
              <table className="ingredient-table">
                <tbody>
                  {ingredients?.map(({ name, quantity }, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{name}</td>
                        <td>{quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mb-3">
              <h5>Steps</h5>
              <div className="steps-table">
                {steps?.map((step, idx) => {
                  return (
                    <section key={idx} className="steps-detail-container">
                      {/* <i className="fa-regular fa-circle"></i> */}
                      <p>{idx + 1}.</p>
                      <p>{step}</p>
                    </section>
                  );
                })}
              </div>
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFavoriteAction}
            >
              Save to favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailDialog;

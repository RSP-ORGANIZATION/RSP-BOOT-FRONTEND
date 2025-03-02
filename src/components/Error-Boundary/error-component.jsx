import "./error-component.css";
import ErrorImage from "../../../public/error-image.jpg";

const ErrorComponent = () => {
  return (
    <div className="error-boundary">
      <div className="error-container">
        <h1>Something went wrong</h1>
        <img src={ErrorImage} alt="Error occured" />
        <p>Try refreshing the page</p>
      </div>
    </div>
  );
};

export default ErrorComponent;

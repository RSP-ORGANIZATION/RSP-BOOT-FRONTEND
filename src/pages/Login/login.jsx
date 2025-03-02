import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { executeToast } from "../../utils/execute-toast";
import Toast from "../../components/Toast/toast";

export default function Login() {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authPatterns = {
    phone: /^[6789]\d{9}$/,
    password:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const errorFields = {
    phone: {
      title: "Invalid Phone Number",
      description: "The phone number should consist of 10 digits.",
    },
    password: {
      title: "Invalid Password",
      description:
        "Minimum length: 8, Should contain each of uppercase, lowercase, number and special character",
    },
  };

  // ! Importing BACKEND url
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const invalidField = Object.keys(formData).find((item) => {
      return !authPatterns[item].test(formData[item]);
    });

    if (invalidField) {
      const { title, description } = errorFields[invalidField];
      executeToast({
        title: title,
        content: description,
      });
      setIsLoading(false);
      return;
    }

    async function authenticateUser() {
      try {
        const completeUrl = backendUrl + "login";
        const response = await axios.post(completeUrl, formData);
        if (response.status === 200) {
          const token = response.data?.token;

          if (localStorage && token) {
            localStorage.setItem("token", token);
            console.log("token:", token);
          } else {
            return;
          }
          navigate("/home", { state: { authenticLogin: true }, replace: true });
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          const { message } = data;
          if (status === 404) {
            executeToast({
              title: message,
              description:
                "The entered number is not registered with any account",
            });
          } else if (status === 401) {
            executeToast({
              title: message,
              description: "The entered password is incorrect",
            });
          }
        } else if (error.request) {
          // ! No response received (network error)
          console.error("No response received:", error.request);
        } else {
          // ! Other errors (wrong config, etc.)
          console.error("Axios Error:", error.message);
        }
      }
    }
    await authenticateUser();
    setIsLoading(false);
  }

  async function isAlreadyLoggedIn() {
    async function perform() {
      let token;
      if (localStorage) {
        token = localStorage.getItem("token");
      }
      try {
        const completeUrl = backendUrl + "protected-route";
        const response = await axios.post(completeUrl, { token: token });
        if (response.status === 200) {
          navigate("/home", { replace: true });
        }
      } catch (error) {
        console.log("Auth error:", error);
      }
    }
    await perform();
  }

  useEffect(() => {
    isAlreadyLoggedIn();
  });

  return (
    <div className="login-page appear-animation">
      <Navbar />
      <Toast />
      <main className="login-main-component">
        <form action="" onSubmit={handleSubmit} className="login-form">
          <section>
            <h2>Login</h2>
            <p>Enter the following info to login</p>
          </section>
          <section>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              placeholder="1234567890"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
            />
          </section>
          <section>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </section>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p style={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => navigate("/signup", { replace: true })}
              className="signup-link"
              style={{
                color: "#242424",
                fontWeight: "600",
              }}
              type="button"
            >
              Signup
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}

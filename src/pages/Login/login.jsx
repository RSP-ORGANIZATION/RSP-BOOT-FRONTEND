import { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { executeToast } from "../../utils/execute-toast";

export default function Login() {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authPatterns = {
    phone: /^[6789]\d{9}$/,
    password:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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

    if (!authPatterns["phone"].test(formData["phone"])) {
      executeToast({
        title: "Invalid Phone Number",
        content: "The phone number should consist of 10 digits.",
      });
      return;
    }
    // 8+ chars, uppercase, lowercase, number, special char
    if (!authPatterns["password"].test(formData["password"])) {
      executeToast({
        title: "Invalid Password",
        content:
          "Minimum length: 8, Should contain each of uppercase, lowercase, number and special character",
      });
      return;
    }

    async function authenticateUser() {
      try {
        const completeUrl = backendUrl + "login";
        const response = await axios.post(completeUrl, formData);
        if (response.status === 200) {
          console.log("Response:", response);
          const token = response.data.token;

          if (localStorage) {
            localStorage.setItem("token", token);
            console.log("token:", token);
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

  return (
    <div className="login-page appear-animation">
      <Navbar />
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
              type="text"
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

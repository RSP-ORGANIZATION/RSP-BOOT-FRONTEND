import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { executeToast } from "../../utils/execute-toast";
import Toast from "../../components/Toast/toast";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authPatterns = {
    name: /^[A-Za-z]+ [A-Za-z]+$/,
    phone: /^[6789]\d{9}$/,
    password:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const errorFields = {
    name: {
      title: "Invalid name",
      description: "The name should only consist of letters",
    },
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

    async function createAccount() {
      try {
        const completeUrl = backendUrl + "signup";
        console.log(completeUrl);
        const response = await axios.post(completeUrl, formData);
        if (response.status === 200) {
          executeToast({
            title: "Account created",
            content: "Now you can log into your account",
          });
          setTimeout(() => {
            navigate("/login", {
              replace: true,
            });
          }, 2000);
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          const { message } = data;
          if (status === 400) {
            executeToast({
              title: message,
              content:
                "The entered number is already registered with an account",
            });
          } else if (status === 401) {
            executeToast({
              title: message,
              content: "The entered password is incorrect",
            });
          }
        } else if (error.request) {
          // ! No response received (network error)
          console.error("No response received:", error.request);
        } else {
          // ! Other errors (wrong config, etc.)
          console.error("Axios Error:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    await createAccount();
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="signup-page appear-animation">
      <Navbar />
      <Toast />
      <main className="signup-main-component">
        <form action="" onSubmit={handleSubmit} className="signup-form">
          <section>
            <h2>Signup</h2>
            <p>Enter the following info to create account</p>
          </section>
          <section>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              id="name"
              name="name"
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              placeholder="1234567890"
              id="phone"
              name="phone"
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </section>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create Account"}
          </button>
          <p style={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => navigate("/login", { replace: true })}
              className="login-link"
              style={{
                color: "#242424",
                fontWeight: "600",
              }}
              type="button"
            >
              Login
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}

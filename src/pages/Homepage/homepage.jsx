import { useEffect, useState } from "react";
import HomeNav from "../../components/Home-Nav/home-nav";
import Toast from "../../components/Toast/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { executeToast } from "../../utils/execute-toast";

export default function Homepage() {
  const [searchContent, setSearchContent] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!searchContent) return;
    executeToast({ title: "Form submitted", content: searchContent });
    setSearchContent("");
  }

  useEffect(() => {
    const authenticLogin = location.state?.authenticLogin ?? false;
    if (!authenticLogin) {
      navigate("/login", { replace: true });
    }
  }, [location.state?.authenticLogin, navigate]);

  return (
    <div className="homepage">
      <HomeNav
        setSearchContent={setSearchContent}
        searchContent={searchContent}
        handleSearch={handleSearch}
      />
      <Toast position="bottom-0 end-0" />
      <div className="main-component"></div>
    </div>
  );
}

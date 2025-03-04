import { useState } from "react";
import { UserContext } from "./user-phone-context";

export const UserProvider = ({ children }) => {
  const [userPhone, setUserPhone] = useState("");

  return (
    <UserContext.Provider value={{ userPhone, setUserPhone }}>
      {children}
    </UserContext.Provider>
  );
};

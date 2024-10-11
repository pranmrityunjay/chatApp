import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem("chat-user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse stored user data:", error);
      return null;
    }
  };

  const [authUser, setAuthUser] = useState(getStoredUser);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define prop types to validate `children`
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/getUserData`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        setUser(null);
        console.log(error.response?.data?.message);
      });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const getUserFromLocalStorage = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  };

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const auth = getUserFromLocalStorage();

  if (!auth || !auth.token || isTokenExpired(auth.token)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

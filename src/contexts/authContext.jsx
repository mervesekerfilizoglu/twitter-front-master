import { createContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const loginUpbaseUrl = "http://localhost:8080/api/auth/login";
  const signUpbaseUrl = "http://localhost:8080/api/auth/register";
  const navigate = useNavigate();

  const [token, setToken] = useLocalStorage("token", null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [kayitDurumu, setkayitDurumu] = useState(false);

  // Uygulama başladığında token kontrolü
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const login = async (data) => {
    try {
      const response = await axios.post(loginUpbaseUrl, data);
      console.log('Giriş başarılı:', response.data);

      const accessToken = response.data.token; // Backend yapınıza göre bu alanı ayarlayın
      setToken(accessToken);
      setIsLoggedIn(true);
      
      // Başarılı giriş sonrası yönlendirme
      navigate("/twits");

    } catch (error) {
      console.error('Giriş hatası:', error);
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
        throw error.response.data; // Hata mesajını bileşenlere iletmek için
      } else if (error.request) {
        console.log('No response received');
        throw new Error("Sunucuya ulaşılamadı");
      } else {
        console.log('Error:', error.message);
        throw error;
      }
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await axios.post(signUpbaseUrl, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("kayit basarili", response.data);
      setkayitDurumu(true);
      return response.data; // Başarılı kayıt durumunda veriyi döndür

    } catch (error) {
      console.log(error);
      throw error.response?.data || error.message; // Hata mesajını bileşenlere ilet
    }
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn,
        token,
        login,
        signUp,
        logout,
        kayitDurumu
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
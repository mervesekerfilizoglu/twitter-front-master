import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";


const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
const loginUpbaseUrl = "http://localhost:8080/api/auth/login";
const signUpbaseUrl =
  "http://localhost:8080/api/auth/register";


const [isLoggedIn,setIsLoggedIn]=useState(false);
const[token,setToken]=useLocalStorage("token",null)
const[kayitDurumu,setkayitDurumu]=useState(false);


const login = async (data) => {
  try {
    const response = await axios.post(loginUpbaseUrl, data);
    console.log('Giriş başarılı:', response.data);
  } catch (error) {
    console.error('Giriş hatası:', error);
    if (error.response) {
      // Sunucudan gelen hata
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else if (error.request) {
      // İstek gönderildi ama yanıt alınamadı
      console.log('No response received');
    } else {
      // İstek gönderilirken hata
      console.log('Error:', error.message);
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
     
     
    } catch (error) {
      console.log(error);
     
    }
  };



return (
    <AuthContext.Provider value={{isLoggedIn,login,signUp}}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthContext;

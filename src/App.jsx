import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./components/Login";
import { AuthContextProvider } from "./contexts/authContext";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Twits from "./components/twits";
import { TwitsContextProvider } from "./contexts/twitContext";

function App() {
  return (
    <div>
  <TwitsContextProvider>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/twits" element={<Twits />} /> 
        </Routes>
      </AuthContextProvider>
      </TwitsContextProvider>
    
    </div>
  );
}

export default App;

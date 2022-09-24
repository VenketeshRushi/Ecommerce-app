import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./components/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./components/theme.config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <AuthContextProvider>
      <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
        </ChakraProvider>
      </BrowserRouter>
    </AuthContextProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
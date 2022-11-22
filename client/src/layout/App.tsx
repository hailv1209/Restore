import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../features/About/AboutPage";
import Catalog from "../features/Catalog/Catalog";
import ProductDetails from "../features/Catalog/ProductDetails";
import ContactPage from "../features/Contact/ContactPage";
import HomePage from "../features/Home/HomePage";
import Header from "./Header";

function App() {
  const [darkMode, SetDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const Theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function ChangeTheme() {
    SetDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Header darkMode={darkMode} ChangeTheme={ChangeTheme} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Catalog/:id" element={<ProductDetails />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

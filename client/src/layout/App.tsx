import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../features/About/AboutPage";
import Catalog from "../features/Catalog/Catalog";
import ProductDetails from "../features/Catalog/ProductDetails";
import ContactPage from "../features/Contact/ContactPage";
import HomePage from "../features/Home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../app/Error/ServerError";
import NotFound from "../app/Error/NotFound";
import BasketPage from "../features/Basket/BasketPage";
import { getCookie } from "../app/util/util";
import agent from "../app/api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckOutPage from "../features/Checkout/CheckOutPage";
import { setBasket } from "../features/Basket/basketSlice";
import { useAppDispatch } from "../app/store/configureStore";

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const buyerId = getCookie('buyerID');
    if(buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }else {
      setLoading(false);
    }
  }, [dispatch])

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

  if(loading) return <LoadingComponent message="Initialising app...."/>

  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode} ChangeTheme={ChangeTheme} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Catalog/:id" element={<ProductDetails />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route  path="*" element={<NotFound />} />


        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

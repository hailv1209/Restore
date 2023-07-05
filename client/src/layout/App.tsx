import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
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
import LoadingComponent from "./LoadingComponent";
import CheckOutPage from "../features/Checkout/CheckOutPage";
import { fetchBasketAsync } from "../features/Basket/basketSlice";
import { useAppDispatch } from "../app/store/configureStore";
import Login from "../features/account/Login";
import Register from "../features/account/Register";
import { fetchCurrentUser } from "../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";



function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); 


  const initApp =  useCallback(async () => {
    try {
      await dispatch(fetchBasketAsync());
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error)
    }
  }, [dispatch]) 
   
  useEffect(() => {
   initApp().then(() => setLoading(false));
  }, [initApp])

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

          <Route element={<PrivateRoute/>}>
          <Route path="/checkout" element={<CheckOutPage />} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route  path="*" element={<NotFound />} />


        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

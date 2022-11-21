

import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../features/Catalog/Catalog";
import Header from "./Header";




function App() {
  const [darkMode, SetDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const Theme = createTheme({
    palette: {
      mode: paletteType,
      background : {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    },
    
  });

  function ChangeTheme () {
    SetDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={Theme}>
    <CssBaseline/>
      <Header darkMode={darkMode} ChangeTheme={ChangeTheme}/>
      <Container>
      <Catalog />
      </Container>
     
    </ThemeProvider>
  );
}

export default App;

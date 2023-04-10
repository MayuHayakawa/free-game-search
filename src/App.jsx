import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import ThemeContext from './Context/ThemeContext';

import Navbar from './Component/Navbar/Navbar';
import Home from './Page/Home/Home';
import SearchGame from './Page/SearchGame/SearchGame';
import GameInfo from './Page/SearchGame/GameInfo';

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ChakraProvider>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/searchgame' element={<SearchGame />}></Route>
            <Route path='/searchgame/:id' element={<GameInfo />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </ChakraProvider>
  )
}

export default App

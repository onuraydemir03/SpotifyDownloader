import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from "./pages/Search";
import User from "./pages/User";
import Playlist from "./pages/Playlist";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Search/>}/>
      <Route exact path="/user" element={<User/>}/>
      <Route exact path="/playlist" element={<Playlist/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;

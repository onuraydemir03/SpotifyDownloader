import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/User"
import Playlist from "./components/Playlist"
import Artist from "./components/Artist";
import Album from "./components/Album";
// import Track from "./components/Track"
import Enter from "./components/Enter";
import Download from "./components/Download";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Enter/>}/>
      <Route exact path='/user' element={<User/>}/>
      <Route exact path='/playlist' element={<Playlist/>}/>
      {/* <Route exact path='/track' element={<Track/>}/>/ */}
      <Route exact path='/artist' element= {<Artist/>}/>
      <Route exact path='/album' element= {<Album/>}/>
      <Route exact path='/download' element={<Download/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;

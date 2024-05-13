import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Game from "./components/Game";

// import './App.css'

function App() {
  return (
    <div  className="h-screen bg-slate-950">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route path="/game" element={<Game></Game>}></Route>
        </Routes>
        {/* <div className='bg-red-50'>
       Join Room
      </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

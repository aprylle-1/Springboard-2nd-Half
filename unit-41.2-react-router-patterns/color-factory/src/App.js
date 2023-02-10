import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Colors from './Colors';
import Color from './Color';
import NewColor from './NewColor';
function App() {

  const [colors, setColors] = useState([{colorName : "pink", colorHex : "#FFC0CB"}, {colorName : "red", colorHex : "#FF0000"}])
  function addColor (color) {
    setColors(colors=>{
      return [...colors, color]
    })
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/colors/new" element={<NewColor addColor={addColor}/>}/>
        <Route path="/colors/:color" element={<Color colors={colors}/>}/>
        <Route path="/colors" element={<Colors colors={colors}/>}/>
        <Route path="*" element={<Navigate replace to="/colors"/>}/>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import { Routes , Route } from "react-router-dom"
import Americano from './Americano';
import Cappuccino from './Cappuccino';
import Mocha from './Mocha';
import VendingMachine from './VendingMachine';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VendingMachine/>}/>
        <Route path="/americano" element={<Americano/>}/>
        <Route path="/cappuccino" element={<Cappuccino/>}/>
        <Route path="/mocha" element={<Mocha/>}/>
      </Routes>
    </div>
  );
}

export default App;

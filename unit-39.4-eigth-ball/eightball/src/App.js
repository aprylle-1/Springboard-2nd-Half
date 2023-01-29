import './App.css';
import Eightball from './Eightball';
import { answers } from './Eightball'
function App() {
  return (
    <div className="App">
      <Eightball answers = {answers} />
    </div>
  );
}

export default App;

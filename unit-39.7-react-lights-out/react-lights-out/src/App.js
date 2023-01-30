import './App.css';
import Board from './Board'
function App() {
  return (
    <div className="App">
      <Board nrows={5} ncols={5} chanceLightStartsOn={1} />
    </div>
  );
}

export default App;

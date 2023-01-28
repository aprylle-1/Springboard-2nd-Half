import './App.css';
import Pokedex from './Pokedex'
import Pokecard from './Pokecard'
function App() {
  return (
    <div className="App">
      <h1 className="App-header">Pokedex</h1>
      <div className='App-main'>
        <ul className="App-list">
          { Pokedex.map(pokemon => <li><Pokecard key={pokemon.id} pokemon={pokemon}/></li>) }
        </ul>
      </div>
    </div>
  );
}

export default App;

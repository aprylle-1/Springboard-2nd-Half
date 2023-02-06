import './App.css';
import VendingMachine from './VendingMachine';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Soda from './Soda';
import Ramen from './Ramen';
import Chips from './Chips';
function App() {
  return (
    <BrowserRouter>
        <Switch>
        <Route exact path="/">
          <VendingMachine />
        </Route>
        <Route exact path="/soda">
          <Soda />
        </Route>
        <Route exact path="/chips">
          <Chips/>
        </Route>
        <Route exact path="/ramen">
          <Ramen />
        </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

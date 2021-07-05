import Header from './components/Header';
import NuevoDestinatario from './views/NuevoDestinatario';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Historial from "./views/Historial";
import Transferir from "./views/Transferir";

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8 margen-tabla-dest">
                    <NuevoDestinatario />
                  </div>
                  <div className="col-md-2"></div>
                </div>
              </div>
            </Route>
            <Route path="/verhistorial">
              <Historial />
            </Route>
            <Route path="/transferencia">
              <Transferir />
            </Route>

            {/* <Route path="/register">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <Register />
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </div>
            </Route>
            <Route path="/all">
              <All />
            </Route>
            <Route path="/historial">
              <Historial />
            </Route>
            <Route path="/">
              <Main />
            </Route> */}
          </Switch>
        </Router>

    </div>
  );
}

export default App;

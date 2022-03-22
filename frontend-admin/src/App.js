import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  SinglePage,
  ExitQueue,
  EarthStaking,
  EarthTreasury,
  PreSale,
  PresaleAllocation,
  LockedFruit,
  EarthERC20Token,
  StableCoin,
  Fruit,
  Addresses,
  Navbar,
} from "./components";

import { DeployAll, Settings, Home } from "./screens";

function App() {
  const Routing = () => {
    return (
      <>
        <Navbar />
        <div className="screen">
          <div className="addresses">
            <Addresses />
          </div>
          <div className="app">
            <div>
              <Router>
                <Route exact path="/deploy-all" component={DeployAll} />
                <Route exact path="/singlepage" exact component={SinglePage} />
                <Route exact path="/exit-queue" component={ExitQueue} />
                <Route exact path="/" component={Home} />
                <Route exact path="/earth-staking" component={EarthStaking} />
                <Route exact path="/pre-sale" component={PreSale} />
                <Route exact path="/earth-treasury" component={EarthTreasury} />
                <Route
                  exact
                  path="/presale-allocation"
                  component={PresaleAllocation}
                />
                <Route exact path="/locked-fruit" component={LockedFruit} />
                <Route
                  exact
                  path="/earth-erc20token"
                  component={EarthERC20Token}
                />
                <Route exact path="/stable-coin" component={StableCoin} />
                <Route exact path="/fruit" component={Fruit} />
                <Route exact path="/settings" component={Settings} />
              </Router>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="app">
      <Routing />
    </div>
  );
}

export default App;

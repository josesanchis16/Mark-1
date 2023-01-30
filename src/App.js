import { Redirect, Route, Switch } from "react-router-dom";
import 'react-table/react-table.css';
import { AUTH_PATH } from "./Paths";
import { MainRoutes } from "./Routes";

import './Assets/style/style.scss';

const App = () => {
  return (
    <div className="container-fluid">

      <Switch >
        {MainRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              {...route}
              component={() => (
                route.layout ?
                  <route.layout>
                    <route.component />
                  </route.layout>
                  :
                  <route.component />
              )}
            />
          );
        })}
        <Redirect to={AUTH_PATH} />
      </Switch>
    </div>
  );
}

export default App;

import { Route, Switch } from "react-router-dom";
import { MainRoutes } from "./Routes";
import NotFound from "./Views/404";

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
        <Route path="*" exact={false} component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";

import routes from './routes/routeMap'

const AppRouter = () => (
  <Router>
    <Switch>
      {
        routes.map((item, index) => {
          return (
            <Route exact key={index} path={item.path} render={
              () => {
                let token = localStorage.getItem('token')
                if(item.auth){ // 该路由需要Token验证
                  let token = localStorage.getItem('token')
                  if(!token){
                    return <Redirect to="/login" />
                  }
                }
                return <item.component />
              }
            } ></Route>
          )
        })
      }
    </Switch>
  </Router>
);

export default AppRouter;
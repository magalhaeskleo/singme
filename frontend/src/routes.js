import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import PaperBase from './pages/PaperBase';
import RegisterGroup from './pages/RegisterGroup';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" exact component={Register} />
        <Route path="/home" component={PaperBase} />
        <Route path="/register/group" component={RegisterGroup} />
      </Switch>
    </BrowserRouter>
  );
}

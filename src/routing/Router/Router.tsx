import React from 'react';
import { createBrowserHistory, History } from 'history';
import { Redirect, Route, Router as ReactRouter, Switch } from 'react-router-dom';

import * as Pages from 'pages';
import { Navigation } from '../Navigation';
import { ROUTES } from '../constants';

// Create a history of your choosing (we're using a browser history in this case)
const history: History = createBrowserHistory();

// Initialize navigation service
Navigation.init(history);

export const Router: React.FunctionComponent = () => (
  <ReactRouter history={history}>
    <Switch>
      <Route exact path={ROUTES.page0} component={Pages.Page0} />
      <Route exact path={ROUTES.page1} component={Pages.Page1} />
      <Route exact path={ROUTES.page2} component={Pages.Page2} />
      <Route exact path={ROUTES.page3} component={Pages.Page3} />
      <Redirect exact from={ROUTES.page4} to={ROUTES.page3} />
      <Redirect exact from={ROUTES.page5} to={ROUTES.page1} />
      <Route exact path={ROUTES.page6} component={Pages.Page6} />
      <Route exact path={ROUTES.page7} component={Pages.Page7} />
      <Route exact path={ROUTES.page8} component={Pages.Page8} />
      <Pages.PageNotFound />
    </Switch>
  </ReactRouter>
);

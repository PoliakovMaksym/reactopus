import React from 'react';
import { createBrowserHistory, History } from 'history';
import { Redirect, Route, Router as OriginalRouter, Switch } from 'react-router-dom';

import * as Pages from 'pages';

interface RouteNames {
  [key: string]: string;
}

const RouteNames: RouteNames = {
  page0: '/',
  page1: '/page1',
  page2: '/page2/:jobId',
  page3: '/page3/random',
  page4: '/page4',
  page5: '/page5/:userId',
  page6: '/page6',
  page7: '/page6/page7',
  page8: '/page6/page8',
  page9: '/page9/:adminId',
};

// Create a history of your choosing (we're using a browser history in this case)
const history: History = createBrowserHistory();

export class Router extends React.Component {
  // RENDER

  render() {
    return (
      <OriginalRouter history={history}>
        <Switch>
          <Route exact path={RouteNames.page0} component={Pages.Page0} />
          <Route exact path={RouteNames.page1} component={Pages.Page1} />
          <Route exact path={RouteNames.page2} component={Pages.Page2} />
          <Route exact path={RouteNames.page3} component={Pages.Page3} />
          <Redirect exact from={RouteNames.page4} to={RouteNames.page3} />
          <Redirect exact from={RouteNames.page5} to={RouteNames.page1} />
          <Route exact path={RouteNames.page6} component={Pages.Page6} />
          <Route exact path={RouteNames.page7} component={Pages.Page7} />
          <Route exact path={RouteNames.page8} component={Pages.Page8} />
          <Pages.PageNotFound />
        </Switch>
      </OriginalRouter>
    );
  }
}
